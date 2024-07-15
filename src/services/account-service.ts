import { Account } from "../entities/Account";
import { getRepository } from "typeorm";

export interface AccountService {
  createAccount(accountData: {
    name: string;
    balance: number;
  }): Promise<Account>;
  deleteAccount: (id: number) => Promise<void>;
  getAccountById(accountId: number): Promise<Account | null>;
}

export const accountService: AccountService = {
  async createAccount(accountData: { name: string; balance: number }) {
    const accountRepository = getRepository(Account);
    const account = accountRepository.create(accountData);
    return accountRepository.save(account);
  },
  async deleteAccount(id: number) {
    const accountRepository = getRepository(Account);
    await accountRepository.delete(id);
  },

  async getAccountById(accountId: number) {
    const accountRepository = getRepository(Account);
    const account = await accountRepository.findOne({
      where: { id: accountId },
    });
    return account;
  },
};
