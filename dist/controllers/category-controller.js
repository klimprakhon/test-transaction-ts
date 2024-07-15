"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const category_service_1 = require("../services/category-service");
exports.categoryController = {
    addCategory: async (req, res, next) => {
        try {
            const data = req.body;
            const newCategory = await category_service_1.categoryService.createCategory(data);
            res.status(200).json({ newCategory });
        }
        catch (error) {
            next(error);
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            const id = req.params.categoryId;
            const categoryId = Number(id);
            await category_service_1.categoryService.deleteCategory(categoryId);
            res.status(200).json({ message: "Category deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    },
};
