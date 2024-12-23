import $api from "../../../shared/http";


export class CategoryService {
    static async getCategories() {
        const response = await $api.get('/category');
        return response.data;
    }
    static async getCategoryByName(name) {
        const response = await $api.get('/category', {
            params: {
                name
            }
        });
        return response.data;
    }
}
