import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { prisma } from "../prisma";
import { checkPwd, hashPwd } from "../utils/password";

export const AuthService = {
  async register(email: string, password: string) {
    const user = await prisma.user.create({
      data: { email, hashedPassword: await hashPwd(password) },
    });
    return user;
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await checkPwd(password, user.hashedPassword)))
      throw new Error("INVALID_CREDENTIALS");
    // @ts-ignore
    const token = jwt.sign({ sub: user.id }, env.JWT_SECRET as jwt.Secret, {
      expiresIn: env.JWT_EXPIRES_IN,
    });
    return { token, user };
  },
};
