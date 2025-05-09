import {categoryService} from "../services/index.js";


class CategoryController {

    async getAllCategories(req, res, next) {
        try {
            const categories = await categoryService.getAll(req.query);
            res.status(200).json({
                success: true,
                ...categories
            });
        } catch (e) {
            next(e);
        }
    }

    async getCategoryByName(req, res, next) {
        try {
            const category = await categoryService.getByName(req.params.name);
            res.status(200).json({
                success: true,
                data: category
            });
        } catch (e) {
            next(e);
        }
    }

    async createCategory(req, res, next) {
        try {
            const category = await categoryService.create(req.body.name, req.body.description);
            res.status(200).json({
                success: true,
                data: category
            });
        } catch (e) {
            next(e);
        }
    }

}

export const categoryController = new CategoryController();
