import $api from "../../../shared/http";


export class IngredientService {
    static async getIngredients({ page, limit, search }) {
        const response = await $api.get('/ingredients', {
            params: {
                page,
                limit,
                search
            }
        });
        return response.data;
    }
    static async getIngredientByName(name) {
        const response = await $api.get('/ingredients', {
            params: {
                name
            }
        });
        return response.data;
    }
}
