import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Mot de passe ≥ 6 caractères"),
  name: z.string().min(1).optional(),
});
