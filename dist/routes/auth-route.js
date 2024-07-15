"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_controller_1 = __importDefault(require("../controllers/auth-controller"));
const authenticate_1 = __importDefault(require("../middlewares/authenticate"));
const validator_1 = __importDefault(require("../middlewares/validator"));
const express_1 = __importDefault(require("express"));
const authRouter = express_1.default.Router();
authRouter.post("/register", validator_1.default.registerValidation, auth_controller_1.default.register);
authRouter.post("/login", validator_1.default.loginValidation, auth_controller_1.default.login);
authRouter.get("/me", authenticate_1.default, auth_controller_1.default.getMe);
authRouter.post("/logout", authenticate_1.default, auth_controller_1.default.logout);
exports.default = authRouter;
