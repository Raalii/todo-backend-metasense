import bcrypt from "bcrypt";
const SALT_ROUNDS = 10;
export const hashPwd = (plain: string) => bcrypt.hash(plain, SALT_ROUNDS);
export const checkPwd = (plain: string, hash: string) =>
  bcrypt.compare(plain, hash);
