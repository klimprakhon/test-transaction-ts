"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user-service");
const hash_service_1 = __importDefault(require("../services/hash-service"));
const session_service_1 = require("../services/session-service");
const authController = {
    register: async (req, res, next) => {
        try {
            const data = req.input;
            // Check if user exists by username
            const existingUser = await user_service_1.userService.findUserByUsername(data.username);
            if (existingUser) {
                return res.status(400).json({ message: "Username is already taken" });
            }
            // hash password
            data.password = await hash_service_1.default.hash(data.password);
            await user_service_1.userService.createUser(data);
            res.status(200).json({ message: "user created" });
        }
        catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        try {
            const data = req.input;
            const existingUser = await user_service_1.userService.findUserByUsername(data.username);
            if (!existingUser) {
                return res.status(400).json({ message: "User not found" });
            }
            // check if input password is correct
            const isMatch = await hash_service_1.default.compare(data.password, existingUser.password);
            if (!isMatch) {
                return res.status(400).json({ message: "invalid credentials" });
            }
            const sessionId = await session_service_1.sessionService.createSession(data.username);
            // Set sessionId as a cookie in the response
            res.cookie("sessionId", sessionId, { httpOnly: true });
            // Respond with success message or user data
            res
                .status(200)
                .json({ message: "Session created", username: data.username });
        }
        catch (error) {
            res.status(500).json({ message: "Failed to create session" });
        }
    },
    getMe: (req, res, next) => {
        const user = req.user;
        res.status(200).json({ user });
    },
    logout: async (req, res, next) => {
        const sessionId = req.cookies.sessionId;
        try {
            await session_service_1.sessionService.deleteSession(sessionId);
            res.clearCookie("sessionId");
            res.status(200).json({ message: "Logout successfully" });
        }
        catch (error) {
            next(error);
        }
    },
};
exports.default = authController;
