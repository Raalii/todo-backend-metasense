import { z } from "zod";

export const createColumnSchema = z.object({
  name: z.string().min(1),
  position: z.number().int(),
});

export const updateColumnSchema = z.object({
  name: z.string().min(1).optional(),
  position: z.number().int().optional(),
});
