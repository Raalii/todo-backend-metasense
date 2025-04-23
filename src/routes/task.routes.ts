import { Router } from "express";
import {
  createTask,
  deleteTask,
  listTasks,
  updateTask,
} from "../controllers/task.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../validators/task.validator";

export const taskRouter = Router();

taskRouter.use(authenticateJWT);

taskRouter.get("/", listTasks);
taskRouter.post("/", validate(createTaskSchema), createTask);
taskRouter.put("/:id", validate(updateTaskSchema), updateTask);
taskRouter.delete("/:id", deleteTask);
