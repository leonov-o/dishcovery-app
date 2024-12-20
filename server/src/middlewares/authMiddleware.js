import {ApiError} from "../exceptions/ApiError.js";
import {verifyToken} from "../utils/jwt.js";
import {_logFunc} from "nodemailer/lib/shared/index.js";


export default function (req, res, next) {
    try {
        const allowedPaths = [/^\/recipe\/\w+$/];
        const isAllowedPath = allowedPaths.some((pattern) => pattern.test(req.path));
        console.log(`authMiddleware ${req.path} ${req.method} ${isAllowedPath}`);

        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            if(isAllowedPath) return next();
            return next(ApiError.UnauthorizedError());
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }

        const userData = verifyToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        console.log(e)
        return next(ApiError.UnauthorizedError());
    }
};
