import express from "express";
import { accountController } from "../controllers/account-controller";

const accountRouter = express.Router();

accountRouter.post("/", accountController.addAccount);

accountRouter.post("/:accountId", accountController.deleteAccount);

export default accountRouter;
