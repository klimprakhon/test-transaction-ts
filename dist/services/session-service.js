"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionService = void 0;
const Session_1 = require("../entities/Session");
const typeorm_1 = require("typeorm");
exports.sessionService = {
    async createSession(username) {
        const sessionId = Math.random().toString(36).substring(2);
        const sessionRepository = (0, typeorm_1.getRepository)(Session_1.Session);
        await sessionRepository.save({ sessionId, username });
        return sessionId;
    },
    async findSession(sessionId) {
        const sessionRepository = (0, typeorm_1.getRepository)(Session_1.Session);
        const session = await sessionRepository.findOne({ where: { sessionId } });
        return session;
    },
    async deleteSession(sessionId) {
        const sessionRepository = (0, typeorm_1.getRepository)(Session_1.Session);
        await sessionRepository.delete({ sessionId });
    },
};
