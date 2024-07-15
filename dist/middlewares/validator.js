"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { registerSchema, loginSchema } = require("../utils/auth-validator");
const validator = {
    registerValidation: (req, res, next) => {
        const { value, error } = registerSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        req.input = value;
        next();
    },
    loginValidation: (req, res, next) => {
        const { value, error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        req.input = value;
        next();
    },
};
exports.default = validator;
