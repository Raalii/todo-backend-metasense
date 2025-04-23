// src/middlewares/validate.middleware.ts
import { NextFunction, Request, RequestHandler, Response } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema): RequestHandler =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors: result.error.flatten() });
      return; // on sort en retournant void
    }
    req.body = result.data; // les données parsées/typées
    next(); // aucune valeur retournée
  };
