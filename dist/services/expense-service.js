"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseService = void 0;
const Expense_1 = require("../entities/Expense");
const typeorm_1 = require("typeorm");
exports.expenseService = {
    async createExpense(expenseData) {
        const expenseRepository = (0, typeorm_1.getRepository)(Expense_1.Expense);
        const expense = await expenseRepository.create(expenseData);
        return expenseRepository.save(expense);
    },
    async deleteExpense(id) {
        const expenseRepository = (0, typeorm_1.getRepository)(Expense_1.Expense);
        await expenseRepository.delete(id);
    },
    async getSummary(period) {
        const expenseRepository = (0, typeorm_1.getRepository)(Expense_1.Expense);
        let date = new Date();
        let startDate;
        let endDate = new Date();
        switch (period) {
            case "day":
                startDate = new Date(date.setHours(0, 0, 0, 0));
                endDate.setHours(23, 59, 59, 999);
                break;
            case "month":
                startDate = new Date(date.getFullYear(), date.getMonth(), 1);
                endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                break;
            case "year":
                startDate = new Date(date.getFullYear(), 0, 1);
                endDate = new Date(date.getFullYear(), 11, 31);
                break;
            default:
                throw new Error("Invalid period");
        }
        const summary = await expenseRepository
            .createQueryBuilder("expense")
            .select("SUM(expense.amount)", "total")
            .addSelect("expense.account", "account")
            .addSelect("expense.category", "category")
            .where("expense.date >= :startDate AND expense.date <= :endDate", {
            startDate,
            endDate,
        })
            .groupBy("expense.account, expense.category")
            .getRawMany();
        return summary;
    },
    async filterExpense(filters, pagination) {
        const expenseRepository = (0, typeorm_1.getRepository)(Expense_1.Expense);
        const query = expenseRepository.createQueryBuilder("expense");
        if (filters.month) {
            const startDate = new Date(filters.year, filters.month - 1, 1);
            const endDate = new Date(filters.year, filters.month, 0);
            query.andWhere("expense.date >= :startDate AND expense.date <= :endDate", { startDate, endDate });
        }
        if (filters.category) {
            query.andWhere("expense.category = :category", {
                category: filters.category,
            });
        }
        if (filters.account) {
            query.andWhere("expense.account = :account", {
                account: filters.account,
            });
        }
        const page = pagination.page || 1;
        const limit = pagination.limit || 10;
        const offset = (page - 1) * limit;
        const [expenses, total] = await query
            .skip(offset)
            .take(limit)
            .getManyAndCount();
        return {
            expenses,
            total,
            page,
            limit,
        };
    },
};
