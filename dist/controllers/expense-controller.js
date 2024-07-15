"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseController = void 0;
const expense_service_1 = require("../services/expense-service");
const account_service_1 = require("../services/account-service");
const category_service_1 = require("../services/category-service");
const user_service_1 = require("../services/user-service");
exports.expenseController = {
    addExpense: async (req, res, next) => {
        try {
            const { amount, description, accountId, categoryId, userId } = req.body;
            const account = await account_service_1.accountService.getAccountById(Number(accountId)); // Adjust based on your entity methods
            const category = await category_service_1.categoryService.getCategoryById(Number(categoryId));
            const user = await user_service_1.userService.findUserById(Number(userId));
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
            const newExpense = await expense_service_1.expenseService.createExpense(data);
            res.status(200).json({ newExpense });
        }
        catch (error) {
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
            await expense_service_1.expenseService.deleteExpense(expenseId);
            res.status(200).json({ message: "Expense deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    },
    getExpenseSummary: async (req, res, next) => {
        try {
            const { period } = req.query;
            const summary = await expense_service_1.expenseService.getSummary(period);
            res.status(200).json(summary);
        }
        catch (error) {
            next(error);
        }
    },
    filterExpenses: async (req, res, next) => {
        try {
            const { month, year, category, account, page, limit } = req.query;
            const filters = {
                month: month ? Number(month) : undefined,
                year: year ? Number(year) : undefined,
                category: category,
                account: account,
            };
            const pagination = {
                page: page ? Number(page) : 1,
                limit: limit ? Number(limit) : 10,
            };
            const expenses = await expense_service_1.expenseService.filterExpense(filters, pagination);
            res.status(200).json(expenses);
        }
        catch (error) {
            next(error);
        }
    },
};
