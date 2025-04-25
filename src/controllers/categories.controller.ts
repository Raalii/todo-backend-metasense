import { Request, Response } from "express";
import { CategoryService } from "../services/categories.service";

export const CategoryController = {
  list: (req: Request, res: Response) =>
    CategoryService.list(req.userId!).then(res.json.bind(res)),
  create: (req: Request, res: Response) =>
    CategoryService.create(req.userId!, req.body.name, req.body.color).then(
      (c) => res.status(201).json(c)
    ),
  update: (req: Request, res: Response) =>
    CategoryService.update(req.userId!, req.params.id, req.body).then(
      res.json.bind(res)
    ),
  remove: (req: Request, res: Response) =>
    CategoryService.remove(req.userId!, req.params.id).then(() =>
      res.status(204).end()
    ),
};
