"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const Category_1 = require("../entities/Category");
const typeorm_1 = require("typeorm");
exports.categoryService = {
    async createCategory(categoryData) {
        const categoryRepository = (0, typeorm_1.getRepository)(Category_1.Category);
        const category = categoryRepository.create(categoryData);
        return categoryRepository.save(category);
    },
    async deleteCategory(id) {
        const categoryRepository = (0, typeorm_1.getRepository)(Category_1.Category);
        await categoryRepository.delete(id);
    },
    async getCategoryById(categoryId) {
        const categoryRepository = (0, typeorm_1.getRepository)(Category_1.Category);
        const category = await categoryRepository.findOne({
            where: { id: categoryId },
        });
        return category;
    },
};
