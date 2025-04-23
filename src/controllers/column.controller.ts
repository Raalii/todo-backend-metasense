import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { ColumnService } from "../services/column.service";
import { asyncHandler } from "../utils/asyncHandler";

export const getColumns = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    res.json(await ColumnService.findAll(req.userId!));
  }
);
export const createColumn = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    res.status(201).json(await ColumnService.create(req.userId!, req.body));
  }
);
export const updateColumn = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    res.json(await ColumnService.update(req.params.id, req.userId!, req.body));
  }
);
export const deleteColumn = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    await ColumnService.remove(req.params.id, req.userId!);
    res.status(204).end();
  }
);
