import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user-service";
import hashService from "../services/hash-service";
import { sessionService } from "../services/session-service";

interface AuthController {
  register: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | undefined>;
  login: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<Response | undefined>;
  getMe: (req: Request, res: Response, next: NextFunction) => void;
  logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const authController: AuthController = {
  register: async (req, res, next) => {
    try {
      const data = req.input;

      // Check if user exists by username
      const existingUser = await userService.findUserByUsername(data.username);

      if (existingUser) {
        return res.status(400).json({ message: "Username is already taken" });
      }

      // hash password
      data.password = await hashService.hash(data.password);

      await userService.createUser(data);

      res.status(200).json({ message: "user created" });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const data = req.input;

      const existingUser = await userService.findUserByUsername(data.username);

      if (!existingUser) {
        return res.status(400).json({ message: "User not found" });
      }

      // check if input password is correct
      const isMatch = await hashService.compare(
        data.password,
        existingUser.password
      );

      if (!isMatch) {
        return res.status(400).json({ message: "invalid credentials" });
      }

      const sessionId = await sessionService.createSession(data.username);

      // Set sessionId as a cookie in the response
      res.cookie("sessionId", sessionId, { httpOnly: true });

      // Respond with success message or user data
      res
        .status(200)
        .json({ message: "Session created", username: data.username });
    } catch (error) {
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
      await sessionService.deleteSession(sessionId);
      res.clearCookie("sessionId");
      res.status(200).json({ message: "Logout successfully" });
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
