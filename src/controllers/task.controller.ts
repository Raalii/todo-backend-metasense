import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

export const TaskController = {
  list: async (req: Request, res: Response) => {
    const filter = {
      projectId: req.query.projectId as string | undefined,
      statusId: req.query.statusId as string | undefined,
      categoryIds: req.query.categoryId
        ? Array.isArray(req.query.categoryId)
          ? (req.query.categoryId as string[])
          : [req.query.categoryId as string]
        : undefined,
    };
    const tasks = await TaskService.list(req.userId!, filter);
    res.json(tasks);
  },

  create: async (req: Request, res: Response) => {
    const task = await TaskService.create(req.userId!, req.body);
    res.status(201).json(task);
  },

  update: async (req: Request, res: Response) => {
    const task = await TaskService.update(req.userId!, req.params.id, req.body);
    res.json(task);
  },

  remove: async (req: Request, res: Response) => {
    await TaskService.remove(req.userId!, req.params.id);
    res.status(204).end();
  },
};
