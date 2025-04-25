import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const data = await AuthService.login(email, password);
  res.json(data);
});

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;
  const user = await AuthService.register(email, password, name);
  res.status(201).json({ user });
});
