// src/middlewares/auth.middleware.ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthRequest extends Request {
  userId?: string;
}

export function authenticateJWT(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  // <-- retourne void
  const header = req.headers.authorization; // Bearer <token>
  if (!header) {
    res.status(401).json({ message: "Missing token" });
    return; // <-- stoppe la fonction
  }

  const [, token] = header.split(" ");
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string };
    req.userId = payload.sub;
    next(); // OK, on passe la main
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
}
