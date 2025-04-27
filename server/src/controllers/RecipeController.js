import {recipeService} from "../services/index.js";

class RecipeController {
    async getRecipes(req, res, next) {
        try {
            const recipes = await recipeService.getAll(req.query);
            res.status(200).json({
                success: true,
                ...recipes
            });
        } catch (e) {
            next(e);
        }
    }

    async getRecipeById(req, res, next) {
        try {
            const recipe = await recipeService.getById(req.params.id, req.user?.id);
            res.status(200).json({
                success: true,
                data: recipe
            });
        } catch (e) {
            next(e);
        }
    }

    async toggleLike(req, res, next) {
        try {
            const likes = await recipeService.toggleLike(req.params.id, req.user.id);
            res.status(200).json({
                success: true,
                data: likes
            });
        } catch (e) {
            next(e);
        }
    }

    async toggleDislike(req, res, next) {
        try {
            const likes = await recipeService.toggleDislike(req.params.id, req.user.id);
            res.status(200).json({
                success: true,
                data: likes
            });
        } catch (e) {
            next(e);
        }
    }

    async createRecipe(req, res, next) {
        try {
            const recipe = await recipeService.create(req.body, req.user.id);
            res.status(200).json({
                success: true,
                data: recipe
            });
        } catch (e) {
            next(e);
        }
    }

    async updateRecipe(req, res, next) {
        try {
            const recipe = await recipeService.update(req.params.id, req.user.id, req.body)
            res.status(200).json({
                success: true,
                data: recipe
            });
        } catch (e) {
            next(e);
        }
    }

    async deleteRecipe(req, res, next) {
        try {
            const recipe = await recipeService.delete(req.params.id, req.user.id);
            res.status(200).json({
                success: true
            });
        } catch (e) {
            next(e);
        }
    }
}

export const recipeController = new RecipeController();
