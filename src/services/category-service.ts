import { Category } from "../entities/Category";
import { getRepository } from "typeorm";

export interface CategoryService {
  createCategory(categoryData: { name: string }): Promise<Category>;
  deleteCategory: (id: number) => Promise<void>;
  getCategoryById(categoryId: number): Promise<Category | null>;
}

export const categoryService: CategoryService = {
  async createCategory(categoryData: { name: string }) {
    const categoryRepository = getRepository(Category);
    const category = categoryRepository.create(categoryData);
    return categoryRepository.save(category);
  },
  async deleteCategory(id: number) {
    const categoryRepository = getRepository(Category);
    await categoryRepository.delete(id);
  },
  async getCategoryById(categoryId: number) {
    const categoryRepository = getRepository(Category);
    const category = await categoryRepository.findOne({
      where: { id: categoryId },
    });
    return category;
  },
};
