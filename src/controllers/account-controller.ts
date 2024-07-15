import { Request, Response, NextFunction } from "express";
import { accountService } from "../services/account-service";

interface AccountController {
  addAccount: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
  deleteAccount: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | void>;
}

export const accountController: AccountController = {
  addAccount: async (req, res, next) => {
    try {
      const data = req.body;
      const newAccount = await accountService.createAccount(data);
      res.status(200).json({ newAccount });
    } catch (error) {
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

      await accountService.deleteAccount(accountId);

      res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      next(error);
    }
  },
};
