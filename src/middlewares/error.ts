import { Request, Response, NextFunction } from "express";
import { QueryFailedError } from "typeorm";

export const errorMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof QueryFailedError) {
    return res.status(400).json({ message: "Database query failed" });
  }

  if (error instanceof Error) {
    return res.status(500).json({ message: "Internal server error" });
  }

  res.status(500).json({ message: "Unknown error occurred" });
};
