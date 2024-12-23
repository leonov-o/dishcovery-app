import Category from "../models/Category.js";


class CategoryService {

    async getAll() {
        return Category.find({});
    }

    async getByName(name) {
        return Category.findOne({name: name});
    }

    async create(name) {
       return Category.create({name, description});
    }
}

export const categoryService = new CategoryService();
