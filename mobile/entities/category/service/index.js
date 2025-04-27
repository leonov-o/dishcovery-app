import $api from "../../../shared/http";


export class CategoryService {
    static async getCategories() {
        const response = await $api.get('/categories');
        return response.data;
    }
    static async getCategoryByName(name) {
        const response = await $api.get('/categories', {
            params: {
                name
            }
        });
        return response.data;
    }
}
