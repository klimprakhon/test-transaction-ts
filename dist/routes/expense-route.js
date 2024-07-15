"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const badwordFilter_1 = require("../middlewares/badwordFilter");
const expense_controller_1 = require("../controllers/expense-controller");
const upload_1 = __importDefault(require("../middlewares/upload"));
const expenseRouter = express_1.default.Router();
expenseRouter.post("/", upload_1.default.single("slip"), badwordFilter_1.badwordFilter, expense_controller_1.expenseController.addExpense);
expenseRouter.get("/summary", expense_controller_1.expenseController.getExpenseSummary);
expenseRouter.get("/filter", expense_controller_1.expenseController.filterExpenses);
expenseRouter.delete("/:expenseId", expense_controller_1.expenseController.deleteExpense);
exports.default = expenseRouter;
