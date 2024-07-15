import { Request, Response, NextFunction } from "express";
import { sessionService } from "../services/session-service";
import { Session } from "../entities/Session";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

async function authenticate(req: Request, res: Response, next: NextFunction) {
  const sessionId = req.cookies.sessionId;
  try {
    const session = await sessionService.findSession(sessionId);
    if (!session) {
      return res.status(401).send("Unauthorized");
    }
    req.user = { username: session.username, session: session.sessionId };
    next();
  } catch (error) {
    next(error);
  }
}

export default authenticate;
