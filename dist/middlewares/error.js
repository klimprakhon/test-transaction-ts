"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const typeorm_1 = require("typeorm");
const errorMiddleware = (error, req, res, next) => {
    if (error instanceof typeorm_1.QueryFailedError) {
        return res.status(400).json({ message: "Database query failed" });
    }
    if (error instanceof Error) {
        return res.status(500).json({ message: "Internal server error" });
    }
    res.status(500).json({ message: "Unknown error occurred" });
};
exports.errorMiddleware = errorMiddleware;
