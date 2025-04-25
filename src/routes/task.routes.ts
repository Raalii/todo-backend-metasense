import { Router } from "express";
import { TaskController } from "../controllers/task.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import { createTaskSchema, updateTaskSchema } from "../validators/task.schema";

export const taskRouter = Router();

taskRouter.use(authenticateJWT);

/* GET /api/tasks?projectId=&statusId=&categoryId= (peut être multiple) */
taskRouter.get("/", asyncHandler(TaskController.list));

taskRouter.post(
  "/",
  validate(createTaskSchema),
  asyncHandler(TaskController.create)
);

taskRouter.put(
  "/:id",
  validate(updateTaskSchema),
  asyncHandler(TaskController.update)
);

taskRouter.delete("/:id", asyncHandler(TaskController.remove));
