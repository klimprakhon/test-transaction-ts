import { Request, Response, NextFunction } from "express";
const { registerSchema, loginSchema } = require("../utils/auth-validator");

declare module "express-serve-static-core" {
  interface Request {
    input?: any;
  }
}

interface Validator {
  registerValidation: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Response | void;
  loginValidation: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Response | void;
}

const validator: Validator = {
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

export default validator;
