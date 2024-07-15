import authController from "../controllers/auth-controller";
import authenticate from "../middlewares/authenticate";
import validator from "../middlewares/validator";
import express from "express";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validator.registerValidation,
  authController.register
);

authRouter.post("/login", validator.loginValidation, authController.login);

authRouter.get("/me", authenticate, authController.getMe);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
