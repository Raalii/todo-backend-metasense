import { Request, Response } from "express";
import { ProjectService } from "../services/projects.service";

export const ProjectController = {
  list: (req: Request, res: Response) =>
    ProjectService.list(req.userId!).then(res.json.bind(res)),
  create: (req: Request, res: Response) =>
    ProjectService.create(req.userId!, req.body.name).then((p) =>
      res.status(201).json(p)
    ),
  update: (req: Request, res: Response) =>
    ProjectService.update(req.userId!, req.params.id, req.body).then(
      res.json.bind(res)
    ),
  remove: (req: Request, res: Response) =>
    ProjectService.remove(req.userId!, req.params.id).then(() =>
      res.status(204).end()
    ),
};
