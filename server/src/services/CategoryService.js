import Category from "../models/Category.js";


class CategoryService {

    async getAll() {
        return Category.find({});
    }

    async getById(id) {
        return Category.findOne({_id: id});
    }

    async create(name) {
       return Category.create({name, description});
    }
}

export const categoryService = new CategoryService();
