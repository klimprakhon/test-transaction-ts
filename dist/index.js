"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = __importDefault(require("./routes/auth-route"));
const account_route_1 = __importDefault(require("./routes/account-route"));
const category_route_1 = __importDefault(require("./routes/category-route"));
const expense_route_1 = __importDefault(require("./routes/expense-route"));
const error_1 = require("./middlewares/error");
const app = (0, express_1.default)();
const port = process.env.PORT || 8008;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/auth", auth_route_1.default);
app.use("/accounts", account_route_1.default);
app.use("/categories", category_route_1.default);
app.use("/expenses", expense_route_1.default);
app.use(error_1.errorMiddleware);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
