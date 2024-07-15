import { User } from "../entities/User";
import { getRepository } from "typeorm";

export interface UserService {
  createUser(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<void>;
  findUserByUsername(username: string): Promise<User | null>;
  findUserById(id: number): Promise<User | null>;
}

export const userService = {
  async createUser(userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<void> {
    const userRepository = getRepository(User);
    await userRepository.save({
      username: userData.username,
      email: userData.email,
      password: userData.password,
    });
  },

  async findUserByUsername(username: string): Promise<User | null> {
    const userRepository = getRepository(User);
    return userRepository.findOne({ where: { username } });
  },

  async findUserById(id: number): Promise<User | null> {
    const userRepository = getRepository(User);
    return userRepository.findOne({ where: { id } });
  },
};
