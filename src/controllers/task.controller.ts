import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { TaskService } from "../services/task.service";
import { asyncHandler } from "../utils/asyncHandler";

export const listTasks = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.json(await TaskService.list(req.userId!));
});

export const createTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.status(201).json(await TaskService.create(req.userId!, req.body));
});

export const updateTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  res.json(await TaskService.update(req.params.id, req.userId!, req.body));
});

export const deleteTask = asyncHandler(async (req: AuthRequest, res: Response) => {
  await TaskService.remove(req.params.id, req.userId!);
  res.status(204).end();
});
