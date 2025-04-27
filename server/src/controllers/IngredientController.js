import { ingredientService } from "../services/index.js";


class IngredientController {

    async getAllIngredients(req, res, next) {
        try {
            const ingredients = await ingredientService.getAll(req.query);
            res.status(200).json({
                success: true,
                ...ingredients
            });
        } catch (e) {
            next(e);
        }
    }

    async getIngredientByName(req, res, next) {
        try {
            const ingredient = await ingredientService.getByName(req.params.name);
            res.status(200).json({
                success: true,
                data: ingredient
            });
        } catch (e) {
            next(e);
        }
    }

    async createIngredient(req, res, next) {
        try {
            const ingredient = await ingredientService.create(req.body.name, req.body.defaultUnit, req.body.possibleUnits);
            res.status(200).json({
                success: true,
                data: ingredient
            });
        } catch (e) {
            next(e);
        }
    }

}

export const ingredientController = new IngredientController();
