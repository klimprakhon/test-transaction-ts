"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const account_controller_1 = require("../controllers/account-controller");
const accountRouter = express_1.default.Router();
accountRouter.post("/", account_controller_1.accountController.addAccount);
accountRouter.post("/:accountId", account_controller_1.accountController.deleteAccount);
exports.default = accountRouter;
