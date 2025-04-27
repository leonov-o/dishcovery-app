import $api from "../../../shared/http";


export class RecipeService {
    static async getRecipes(filters) {
        const response = await $api.get('/recipes', {
            params: filters
        });
        return response.data;
    }
    static async getRecipeById(id) {
        const response = await $api.get(`/recipes/${id}`);
        return response.data;
    }

    static async toggleLike(id) {
        const response = await $api.post(`/recipes/${id}/like`)
        return response.data;
    }

    static async toggleDislike(id) {
        const response = await $api.post(`/recipes/${id}/dislike`)
        return response.data;
    }

    static async createRecipe(data) {
        const response = await $api.post('/recipes', data);
        return response.data;
    }

    static async updateRecipe(id, data) {
        const response = await $api.put(`/recipes/${id}`, data);
        return response.data;
    }

    static async deleteRecipe(id) {
        const response = await $api.delete(`/recipes/${id}`);
        return response.data;
    }
}
