// src/controllers/statuses.controller.ts
import { Request, Response } from "express";
import { StatusService } from "../services/statuses.service";

export const StatusController = {
  list: async (req: Request, res: Response) => {
    const data = await StatusService.list(req.userId!);
    res.json(data);
  },

  create: async (req: Request, res: Response) => {
    const { name, color } = req.body;
    const status = await StatusService.create(req.userId!, name, color);
    res.status(201).json(status);
  },

  update: async (req: Request, res: Response) => {
    const { name, color } = req.body;
    const status = await StatusService.update(req.userId!, req.params.id, {
      name,
      color,
    });
    res.json(status);
  },

  remove: async (req: Request, res: Response) => {
    await StatusService.remove(req.userId!, req.params.id);
    res.status(204).end();
  },
};
