import $api from "../../../shared/http";


export class UserService {

    static async getUsers() {
        const response = await $api.get('/users');
        return response.data;
    }
    static async getUserById(id) {
        const response = await $api.get(`/users/${id}`);
        return response.data;
    }
    static async getUserByEmail(email) {
        const response = await $api.get(`/users/email/${email}`);
        return response.data;
    }

    static async login(credentials) {
        const response = await $api.post('/login', credentials);
        return response.data;
    }

    static async register(credentials) {
        const response = await $api.post('/register', credentials);
        return response.data;
    }

    static async logout(refreshToken) {
        const response = await $api.post('/logout', {refreshToken});
        return response.data;
    }

    static async update(id, data) {
        const response = await $api.put(`/users/${id}`, data);
        return response.data;
    }

    static async deleteUser(id) {
        const response = await $api.delete(`/users/${id}`);
        return response.data;
    }

    static async refresh(refreshToken) {
        const response = await $api.post('/refresh', {refreshToken});
        return response.data;
    }
}
