import { Session } from "../entities/Session";
import { getRepository } from "typeorm";

export interface SessionService {
  createSession(username: string): Promise<string>;
  findSession(sessionId: string): Promise<Session | null>;
  deleteSession(sessionId: string): Promise<void>;
}

export const sessionService: SessionService = {
  async createSession(username: string) {
    const sessionId = Math.random().toString(36).substring(2);
    const sessionRepository = getRepository(Session);
    await sessionRepository.save({ sessionId, username });
    return sessionId;
  },
  async findSession(sessionId: string) {
    const sessionRepository = getRepository(Session);
    const session = await sessionRepository.findOne({ where: { sessionId } });
    return session;
  },
  async deleteSession(sessionId: string) {
    const sessionRepository = getRepository(Session);
    await sessionRepository.delete({ sessionId });
  },
};
