import express from "express";
import { categoryController } from "../controllers/category-controller";

const categoryRouter = express.Router();

categoryRouter.post("/", categoryController.addCategory);
categoryRouter.post("/:categoryId", categoryController.deleteCategory);

export default categoryRouter;
