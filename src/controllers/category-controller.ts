import { Request, Response, NextFunction } from "express";
import { categoryService } from "../services/category-service";

interface CategoryController {
  addCategory: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  deleteCategory: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>;
}

export const categoryController: CategoryController = {
  addCategory: async (req, res, next) => {
    try {
      const data = req.body;
      const newCategory = await categoryService.createCategory(data);

      res.status(200).json({ newCategory });
    } catch (error) {
      next(error);
    }
  },

  deleteCategory: async (req, res, next) => {
    try {
      const id = req.params.categoryId;
      const categoryId = Number(id);
      await categoryService.deleteCategory(categoryId);

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};
