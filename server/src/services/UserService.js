import User from "../models/User.js";
import {comparePasswords, generateAccessToken, generateRefreshToken, hashPassword, verifyToken} from "../utils/jwt.js";
import Session from "../models/Session.js";
import {UserDto} from "../dtos/UserDto.js";
import {ApiError} from "../exceptions/ApiError.js";
import {v4 as uuidv4} from 'uuid';
import {mailService} from "./MailService.js";


class UserService {

    async login({email, password}) {
        if (!email || !password) {
            throw ApiError.BadRequest("Необхідно ввести електронну пошту та пароль");
        }

        const user = await User.findOne({email: email.toLowerCase()});
        if (!user) {
            throw ApiError.BadRequest("Користувача не знайдено");
        }
        if (!comparePasswords(password, user.password)) {
            throw ApiError.BadRequest("Невірний пароль");
        }

        return this.createSession(user);
    }

    async register({email, password, name}) {
        if (!email || !password || !name) {
            throw ApiError.BadRequest("Необхідно ввести електронну пошту, пароль, ім'я");
        }

        const existingUser = await User.findOne({email: email.toLowerCase()})
        if (existingUser) {
            throw ApiError.BadRequest("Користувач вже існує");
        }

        const activationLink = uuidv4();

        const newUser = await this.createUser({email, password, name, activationLink});
        mailService.sendActivationMail(email, `${process.env.SERVER_URL}/api/activate/${activationLink}`);
        return this.createSession(newUser);
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink: activationLink})
        if (!user) {
            throw ApiError.BadRequest('Некоректне посилання активації')
        }
        user.isActivated = true;
        await user.save();
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        return Session.deleteOne({refresh_token: refreshToken});
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        const userData = verifyToken(refreshToken);
        const tokenFromDb = await Session.findOne({refreshToken: refreshToken});
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await User.findById(userData.id);
        const userDto = await new UserDto(user);
        const tokens = {
            accessToken: generateAccessToken({...userDto}),
            refreshToken: generateRefreshToken({...userDto})
        }

        tokenFromDb.refreshToken = tokens.refreshToken;
        tokenFromDb.expiresIn = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        await tokenFromDb.save();

        return {
            ...tokens,
            user: userDto
        };
    }

    async createSession(user) {
        const userDto = await new UserDto(user);
        const tokens = {
            accessToken: generateAccessToken({...userDto}),
            refreshToken: generateRefreshToken({...userDto})
        }

        const existingSessions = await Session.find({userId: user._id});
        if (existingSessions.length >= 5) {
            await Session.deleteMany({userId: user._id});
        }

        await Session.create({
            userId: user._id,
            refreshToken: tokens.refreshToken,
            expiresIn: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
        });
        return {
            ...tokens,
            user: userDto
        };
    }


    async createUser(user) {
        const {email, password, name, activationLink} = user;

        return User.create({
            email: email.toLowerCase(),
            password: hashPassword(password),
            name,
            activationLink
        });
    }

    async getAllUsers() {
        const users = await User.find({});
        return Promise.all(users.map(async user => await new UserDto(user)));
    }

    async getUserById(id) {
        const user = await User.findOne({_id: id});
        if (!user) {
            throw ApiError.BadRequest("Користувача не знайдено");
        }
        return new UserDto(user);
    }

    async getUserByEmail(email) {
        const user = await User.findOne({email: email.toLowerCase()});
        if (!user) {
            throw ApiError.BadRequest("Користувача не знайдено");
        }
        return new UserDto(user);
    }


    async updateUser(id, targetId, user) {
        const targetUser = await User.findOne({_id: targetId});
        if (!targetUser) {
            throw ApiError.BadRequest("Користувача не знайдено");
        }
        if (id !== targetId) {
            throw ApiError.ForbiddenError();
        }

        const updateData = {};
        if (user.email && user.email !== targetUser.email) {
            const existingUser = await User.findOne({email: user.email.toLowerCase()});
            if (existingUser) {
                throw ApiError.BadRequest("Адрес електронної пошти вже занято");
            }
            updateData.email = user.email.toLowerCase();
            updateData.isActivated = false;

            const activationLink = uuidv4();
            updateData.activationLink = activationLink;
            mailService.sendActivationMail(user.email, `${process.env.SERVER_URL}/api/activate/${activationLink}`);
        }
        if (user.password) {
            updateData.password = hashPassword(user.password);
        }
        if (user.name) {
            updateData.name = user.name;
        }

        return new UserDto(await User.findOneAndUpdate({_id: targetId}, updateData, {new: true}));
    }

    async deleteUser(id, targetId) {
        if (id !== targetId) {
            throw ApiError.ForbiddenError();
        }
        return User.findOneAndDelete({_id: targetId});
    }
}

export const userService = new UserService()
