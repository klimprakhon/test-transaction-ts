import { Account } from "../entities/Account";
import { Category } from "../entities/Category";
import { Expense } from "../entities/Expense";
import { getRepository } from "typeorm";
import { User } from "../entities/User";

interface ExpenseService {
  createExpense(expenseData: {
    amount: number;
    description: string;
    account: Account;
    category: Category;
    user: User;
    slipPath: string;
  }): Promise<Expense>;
  deleteExpense(id: number): Promise<void>;
  getSummary(period: string): Promise<any>;
  filterExpense(filters: any, pagination: any): Promise<any>;
}

export const expenseService: ExpenseService = {
  async createExpense(expenseData) {
    const expenseRepository = getRepository(Expense);
    const expense = await expenseRepository.create(expenseData);
    return expenseRepository.save(expense);
  },

  async deleteExpense(id) {
    const expenseRepository = getRepository(Expense);
    await expenseRepository.delete(id);
  },

  async getSummary(period) {
    const expenseRepository = getRepository(Expense);
    let date = new Date();
    let startDate: Date;
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
    const expenseRepository = getRepository(Expense);

    const query = expenseRepository.createQueryBuilder("expense");

    if (filters.month) {
      const startDate = new Date(filters.year, filters.month - 1, 1);
      const endDate = new Date(filters.year, filters.month, 0);
      query.andWhere(
        "expense.date >= :startDate AND expense.date <= :endDate",
        { startDate, endDate }
      );
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
