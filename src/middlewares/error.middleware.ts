// src/middlewares/error.middleware.ts
import { NextFunction, Request, Response } from "express";

export const notFound = (_: Request, res: Response): void => {
  res.status(404).json({ message: "Not found" });
};

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err.code === "P2025")
    res.status(404).json({ message: "Resource not found" });
  else if (err.message === "INVALID_CREDENTIALS")
    res.status(401).json({ message: "Invalid credentials" });
  else {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
