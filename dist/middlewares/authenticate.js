"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session_service_1 = require("../services/session-service");
async function authenticate(req, res, next) {
    const sessionId = req.cookies.sessionId;
    try {
        const session = await session_service_1.sessionService.findSession(sessionId);
        if (!session) {
            return res.status(401).send("Unauthorized");
        }
        req.user = { username: session.username, session: session.sessionId };
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.default = authenticate;
