import Category from "../models/Category.js";


class CategoryService {

    async getAll(query) {
        let page = parseInt(query.page) || 0;
        let limit = parseInt(query.limit) || 10;
        if (page < 0) page = 0;
        if (limit < 1) limit = 1;
        if (limit > 100) limit = 100;


        const categories = await Category.find({}).skip(page * limit).limit(limit);
        const totalCount = await Category.countDocuments();

        return {
            page,
            limit,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            data: categories
        }
    }

    async getByName(name) {
        return Category.findOne({name: name});
    }

    async create(name) {
       return Category.create({name, description});
    }
}

export const categoryService = new CategoryService();
