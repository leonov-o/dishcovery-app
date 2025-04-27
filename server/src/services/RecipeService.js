import Recipe from "../models/Recipe.js";
import { ApiError } from "../exceptions/ApiError.js";
import User from "../models/User.js";
import mongoose from "mongoose";

class RecipeService {

    async getAll(query) {
        const { isPublic, search, category, authorId, sort, ingredients } = query;
        let page = parseInt(query.page) || 0;
        let limit = parseInt(query.limit) || 10;
        if (page < 0) page = 0;
        if (limit < 1) limit = 1;
        if (limit > 100) limit = 100;

        const searchQuery = {};

        if (search) {
            searchQuery.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
                { instructions: { $regex: search, $options: "i" } }
            ];
        }

        if (ingredients) {
            let ingredientIds = [];

            if (typeof ingredients === 'string') {
                ingredientIds = [new mongoose.Types.ObjectId(ingredients)];
            }
            else if (Array.isArray(ingredients)) {
                ingredientIds = ingredients.map(id => new mongoose.Types.ObjectId(id));
            }

            if (ingredientIds.length > 0) {
                searchQuery['$and'] = ingredientIds.map(id => ({
                    'ingredients.ingredient': id
                }));
            }
        }

        if (category) searchQuery.category = new mongoose.Types.ObjectId(category);
        if (authorId) searchQuery.authorId = new mongoose.Types.ObjectId(authorId);

        if (isPublic !== undefined) searchQuery.isPublic = Boolean(isPublic);

        let sortQuery = {};
        if (sort === "likesAsc" || sort === "likesDesc") {
            const sortDirection = sort === "likesAsc" ? 1 : -1;
            console.log("searchQuery", searchQuery);
            const recipes = await Recipe.aggregate([
                { $match: searchQuery },
                {
                    $addFields: {
                        likesCount: { $size: "$likes" },
                    },
                },
                { $sort: { likesCount: sortDirection } },
                { $skip: page * limit },
                { $limit: limit },
            ])

            const populatedRecipes = await Recipe.populate(recipes, [
                { path: "category" },
                { path: "ingredients.ingredient" },
            ]);

            const totalCount = await Recipe.countDocuments(searchQuery);

            return {
                page,
                limit,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                data: populatedRecipes,
            };
        } else {
            if (sort === "newest") sortQuery.createdAt = -1;
            else if (sort === "popular") sortQuery.views = -1;

            const recipes = await Recipe.find(searchQuery)
                .sort(sortQuery)
                .limit(limit)
                .skip(page * limit)
                .populate("category")
                .populate("ingredients.ingredient");

            const totalCount = await Recipe.countDocuments(searchQuery);

            return {
                page,
                limit,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                data: recipes,
            };
        }
    }

    async getById(id, userId) {
        const recipe = await Recipe
            .findById(id)
            .populate("category")
            .populate("ingredients.ingredient");
        ;
        if (!recipe) {
            throw ApiError.BadRequest("Рецепт не знайдено");
        }

        if (!recipe.isPublic && recipe.authorId.toString() !== userId) {
            throw ApiError.ForbiddenError();
        }

        recipe.views = recipe.views + 1;
        await recipe.save();
        return recipe;
    }

    async toggleLike(id, userId) {
        const targetRecipe = await Recipe.findById(id);
        if (!targetRecipe) {
            throw ApiError.BadRequest("Рецепт не знайдено");
        }

        const user = await User.findById(userId);
        if (!user) {
            throw ApiError.BadRequest("Користувача не знайдено");
        }

        const isLiked = targetRecipe.likes.includes(userId);

        if (isLiked) {
            targetRecipe.likes = targetRecipe.likes.filter(like => like.toString() !== userId.toString());
            user.likes = user.likes.filter(like => like.toString() !== id.toString());
        } else {
            targetRecipe.likes.push(userId);
            user.likes.push(id);

            targetRecipe.dislikes = targetRecipe.dislikes.filter(dislike => dislike.toString() !== userId.toString());
            user.dislikes = user.dislikes.filter(dislike => dislike.toString() !== id.toString());
        }

        await Promise.all([targetRecipe.save(), user.save()]);
        return {
            userLikes: user.likes,
            userDislikes: user.dislikes,
            recipeLikes: targetRecipe.likes.length,
            recipeDislikes: targetRecipe.dislikes.length
        };
    }


    async toggleDislike(id, userId) {
        const targetRecipe = await Recipe.findById(id);
        if (!targetRecipe) {
            throw ApiError.BadRequest("Рецепт не знайдено");
        }

        const user = await User.findById(userId);
        if (!user) {
            throw ApiError.BadRequest("Користувача не знайдено");
        }

        const isDisliked = targetRecipe.dislikes.includes(userId);

        if (isDisliked) {
            targetRecipe.dislikes = targetRecipe.dislikes.filter(dislike => dislike.toString() !== userId.toString());
            user.dislikes = user.dislikes.filter(dislike => dislike.toString() !== id.toString());
        } else {
            targetRecipe.dislikes.push(userId);
            user.dislikes.push(id);

            targetRecipe.likes = targetRecipe.likes.filter(like => like.toString() !== userId.toString());
            user.likes = user.likes.filter(like => like.toString() !== id.toString());
        }

        await Promise.all([targetRecipe.save(), user.save()]);
        return {
            userLikes: user.likes,
            userDislikes: user.dislikes,
            recipeLikes: targetRecipe.likes.length,
            recipeDislikes: targetRecipe.dislikes.length
        };
    }


    async create(recipe, userId) {
        if (!userId) {
            throw ApiError.UnauthorizedError();
        }
        if (!recipe.title || !recipe.ingredients || recipe.ingredients.length < 1 ||
            !recipe.instructions || !recipe.category || !recipe.difficulty ||
            recipe.cookTime < 0) {
            throw ApiError.BadRequest("Невірні дані про рецепт");
        }
        if (!recipe.image || recipe.image.length < 1) {
            throw ApiError.BadRequest("Потрібне хоча б одне зображення");
        }

        const newRecipe = await Recipe.create({ ...recipe, authorId: userId })
        return newRecipe;
    }

    async update(id, userId, recipe) {
        const targetRecipe = await Recipe.findOne({ _id: id });
        if (!targetRecipe) {
            throw ApiError.BadRequest("Рецепт не знайдено");
        }
        if (userId !== targetRecipe.authorId.toString()) {
            throw ApiError.ForbiddenError();
        }

        const updateData = {};

        if (recipe.title) {
            updateData.title = recipe.title;
        }
        if (recipe.ingredients && recipe.ingredients instanceof Array) {
            updateData.ingredients = recipe.ingredients;
        }
        if (recipe.instructions) {
            updateData.instructions = recipe.instructions;
        }
        if (recipe.description) {
            updateData.description = recipe.description;
        }
        if (recipe.category) {
            updateData.category = recipe.category;
        }
        if (recipe.isPublic) {
            updateData.isPublic = recipe.isPublic;
        }
        if (recipe.cookTime) {
            updateData.cookTime = recipe.cookTime;
        }
        if (recipe.difficulty) {
            updateData.difficulty = recipe.difficulty;
        }
        if (recipe.image) {
            updateData.image = recipe.image;
        }

        if (recipe.nutritionalValue) {
            updateData.nutritionalValue = recipe.nutritionalValue;
        }

        const updatedRecipe = await Recipe.findOneAndUpdate({ _id: id }, updateData, { new: true })
        return updatedRecipe;
    }

    async delete(id, userId) {
        const targetRecipe = await Recipe.findOne({ _id: id });
        if (!targetRecipe) {
            throw ApiError.BadRequest("Рецепт не знайдено");
        }
        if (userId !== targetRecipe.authorId.toString()) {
            throw ApiError.ForbiddenError();
        }

        return Recipe.findOneAndDelete({ _id: id });
    }

}

export const recipeService = new RecipeService();
