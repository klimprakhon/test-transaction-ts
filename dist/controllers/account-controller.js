"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountController = void 0;
const account_service_1 = require("../services/account-service");
exports.accountController = {
    addAccount: async (req, res, next) => {
        try {
            const data = req.body;
            const newAccount = await account_service_1.accountService.createAccount(data);
            res.status(200).json({ newAccount });
        }
        catch (error) {
            next(error);
        }
    },
    deleteAccount: async (req, res, next) => {
        try {
            const id = req.params.deleteId;
            const accountId = Number(id);
            if (isNaN(accountId)) {
                return res.status(400).json({ message: "Invalid account ID" });
            }
            await account_service_1.accountService.deleteAccount(accountId);
            res.status(200).json({ message: "Account deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    },
};
