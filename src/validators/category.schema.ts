import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "name required"),
  color: z
    .string()
    .regex(/^#?[0-9A-Fa-f]{6}$/, "invalid color")
    .optional()
    .default("#8e8e8e"),
});

export const updateCategorySchema = createCategorySchema.partial();
