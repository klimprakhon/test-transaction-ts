"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountService = void 0;
const Account_1 = require("../entities/Account");
const typeorm_1 = require("typeorm");
exports.accountService = {
    async createAccount(accountData) {
        const accountRepository = (0, typeorm_1.getRepository)(Account_1.Account);
        const account = accountRepository.create(accountData);
        return accountRepository.save(account);
    },
    async deleteAccount(id) {
        const accountRepository = (0, typeorm_1.getRepository)(Account_1.Account);
        await accountRepository.delete(id);
    },
    async getAccountById(accountId) {
        const accountRepository = (0, typeorm_1.getRepository)(Account_1.Account);
        const account = await accountRepository.findOne({
            where: { id: accountId },
        });
        return account;
    },
};
