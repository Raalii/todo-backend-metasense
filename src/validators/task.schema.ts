import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "title required"),
  description: z.string().optional(),
  statusId: z.string().uuid("statusId must be UUID"),
  projectId: z.string().uuid().nullable().optional(),
  categoryIds: z.array(z.string().uuid()).optional(),
});

export const updateTaskSchema = createTaskSchema.partial();
