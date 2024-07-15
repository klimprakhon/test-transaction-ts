"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
exports.userService = {
    async createUser(userData) {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        await userRepository.save({
            username: userData.username,
            email: userData.email,
            password: userData.password,
        });
    },
    async findUserByUsername(username) {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        return userRepository.findOne({ where: { username } });
    },
    async findUserById(id) {
        const userRepository = (0, typeorm_1.getRepository)(User_1.User);
        return userRepository.findOne({ where: { id } });
    },
};
