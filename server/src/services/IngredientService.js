import Ingredient from "../models/Ingredient.js";

class IngredientService {

    async getAll(query) {
        const { search } = query;

        let page = parseInt(query.page) || 0;
        let limit = parseInt(query.limit) || 10;
        if (page < 0) page = 0;
        if (limit < 1) limit = 1;
        if (limit > 100) limit = 100;

        const searchQuery = {};

        if (search) {
            searchQuery.$or = [
                { name: { $regex: search, $options: "i" } }
            ];
        }

        const ingredients = await Ingredient.find(searchQuery).skip(page * limit).limit(limit);
        const totalCount = await Ingredient.countDocuments(searchQuery);

        return {
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            data: ingredients
        }
    }

    async getByName(name) {
        return Ingredient.findOne({ name: name });
    }

    async create(name, defaultUnit, possibleUnits) {
        return Ingredient.create({ name, defaultUnit, possibleUnits });
    }
}

export const ingredientService = new IngredientService();
