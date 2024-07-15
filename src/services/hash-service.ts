import bcrypt from "bcrypt";

interface HashService {
  hash: (password: string) => Promise<string>;
  compare: (password: string, hashedPassword: string) => Promise<boolean>;
}

const hashService: HashService = {
  hash: (password: string): Promise<string> => {
    return bcrypt.hash(password, 12);
  },
  compare: (password: string, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },
};

export default hashService;
