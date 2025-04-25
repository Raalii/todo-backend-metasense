import { z } from "zod";

export const createStatusSchema = z.object({
  name: z.string().min(1, "name required"),
  color: z
    .string()
    .regex(/^#?[0-9A-Fa-f]{6}$/, "invalid color")
    .optional()
    .default("#d3d3d3"),
});

export const updateStatusSchema = createStatusSchema.partial();
