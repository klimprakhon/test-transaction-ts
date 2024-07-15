import { Request, Response, NextFunction } from "express";
import { expenseService } from "../services/expense-service";
import { accountService } from "../services/account-service";
import { categoryService } from "../services/category-service";
import { userService } from "../services/user-service";

interface ExpenseController {
  addExpense: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>;
  deleteExpense: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>;
  getExpenseSummary: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  filterExpenses: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
}

export const expenseController: ExpenseController = {
  addExpense: async (req, res, next) => {
    try {
      const { amount, description, accountId, categoryId, userId } = req.body;

      const account = await accountService.getAccountById(Number(accountId));
      const category = await categoryService.getCategoryById(
        Number(categoryId)
      );
      const user = await userService.findUserById(Number(userId));

      if (account === null || category === null || user === null || !req.file) {
        return res.status(400).json({ message: "Invalid input" });
      }

      const data = {
        amount: parseFloat(amount),
        description,
        account,
        category,
        user,
        slipPath: req.file.path,
      };

      const newExpense = await expenseService.createExpense(data);

      res.status(200).json({ newExpense });
    } catch (error) {
      next(error);
    }
  },

  deleteExpense: async (req, res, next) => {
    try {
      const id = req.params.expenseId;
      const expenseId = Number(id);

      if (isNaN(expenseId)) {
        return res.status(400).json({ message: "Invalid expense ID" });
      }

      await expenseService.deleteExpense(expenseId);

      res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
      next(error);
    }
  },

  getExpenseSummary: async (req, res, next) => {
    try {
      const { period } = req.query;
      const summary = await expenseService.getSummary(period as string);

      res.status(200).json(summary);
    } catch (error) {
      next(error);
    }
  },

  filterExpenses: async (req, res, next) => {
    try {
      const { month, year, category, account, page, limit } = req.query;

      const filters = {
        month: month ? Number(month) : undefined,
        year: year ? Number(year) : undefined,
        category: category as string,
        account: account as string,
      };

      const pagination = {
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
      };

      const expenses = await expenseService.filterExpense(filters, pagination);

      res.status(200).json(expenses);
    } catch (error) {
      next(error);
    }
  },
};
