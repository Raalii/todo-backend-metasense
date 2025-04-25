import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { prisma } from "../prisma";
import { seedUserDefaults } from "../seed";
import { checkPwd, hashPwd } from "../utils/password";

export const AuthService = {
  // Registration
  async register(email: string, password: string, name?: string) {
    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) throw new Error("EMAIL_TAKEN");
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword: await hashPwd(password),
      },
    });
    await seedUserDefaults(user.id); // ← ajout
    return user;
  },

  // Login
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
