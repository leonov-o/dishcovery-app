import Ingredient from "../models/Ingredient.js";

class IngredientService {

    async getAll() {
        return Ingredient.find({});
    }

    async getByName(name) {
        return Ingredient.findOne({name: name});
    }

    async create(name, defaultUnit, possibleUnits) {
       return Ingredient.create({name, defaultUnit, possibleUnits});
    }
}

export const ingredientService = new IngredientService();
