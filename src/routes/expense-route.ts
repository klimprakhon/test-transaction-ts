import express from "express";
import { badwordFilter } from "../middlewares/badwordFilter";
import { expenseController } from "../controllers/expense-controller";
import upload from "../middlewares/upload";

const expenseRouter = express.Router();

expenseRouter.post(
  "/",
  upload.single("slip"),
  badwordFilter,
  expenseController.addExpense
);
expenseRouter.get("/summary", expenseController.getExpenseSummary);
expenseRouter.get("/filter", expenseController.filterExpenses);
expenseRouter.delete("/:expenseId", expenseController.deleteExpense);

export default expenseRouter;
