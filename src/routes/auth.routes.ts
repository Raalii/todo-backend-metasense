import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../validators/auth.schema";

export const authRouter = Router();
authRouter.post("/login", login);
authRouter.post("/register", validate(registerSchema), register);
