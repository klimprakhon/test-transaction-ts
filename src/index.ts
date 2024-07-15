import express from "express";
import "reflect-metadata";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth-route";
import accountRouter from "./routes/account-route";
import categoryRouter from "./routes/category-route";
import expenseRouter from "./routes/expense-route";
import { errorMiddleware } from "./middlewares/error";

const app = express();
const port = process.env.PORT || 8008;

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/accounts", accountRouter);
app.use("/categories", categoryRouter);
app.use("/expenses", expenseRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
