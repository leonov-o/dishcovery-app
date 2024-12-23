import $api from "../../../shared/http";


export class RecipeService {
    static async getRecipes(filters) {
        const response = await $api.get('/recipe', {
            params: filters
        });
        return response.data;
    }
    static async getRecipeById(id) {
        const response = await $api.get(`/recipe/${id}`);
        return response.data;
    }

    static async toggleLike(id) {
        const response = await $api.post(`/recipe/${id}/like`)
        return response.data;
    }

    static async createRecipe(data) {
        const response = await $api.post('/recipe', data);
        return response.data;
    }

    static async updateRecipe(id, data) {
        const response = await $api.put(`/recipe/${id}`, data);
        return response.data;
    }

    static async deleteRecipe(id) {
        const response = await $api.delete(`/recipe/${id}`);
        return response.data;
    }
}
