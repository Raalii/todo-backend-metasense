/* src/middlewares/error.middleware.ts */
import { Prisma } from "@prisma/client";
import { ErrorRequestHandler, RequestHandler } from "express";

/* --- 404 route inexistante ------------------------------------------------ */
export const notFound: RequestHandler = (_req, res): void => {
  res.status(404).json({ error: "Not found" });
};

/* --- gestion centrale ----------------------------------------------------- */
export const errorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
): void => {
  /* → 401 : jeton manquant / invalide (jeté par authenticateJWT) */
  if (err.statusCode === 401 || err.name === "JsonWebTokenError") {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  if (
    err.message === "STATUS_IN_USE" ||
    err.message === "CATEGORY_IN_USE" ||
    err.message === "PROJECT_IN_USE"
  ) {
    res.status(409).json({ message: "Resource in use" });
    return;
  }

  /* → 400 : erreurs de validation (middleware validate) */
  if (err.statusCode === 400) {
    res.status(400).json({ error: err.message });
    return;
  }

  /* → Prisma errors */
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2025": // record not found
        res.status(404).json({ error: "Resource not found" });
        return;
      case "P2002": // unique constraint
        res.status(409).json({ error: "Duplicate value" });
        return;
      case "P2003": // FK constraint
        res.status(404).json({ error: "Related resource not found" });
        return;
    }
  }

  /* → 404 manuel (service retourne null) */
  if (err.statusCode === 404) {
    res.status(404).json({ error: err.message || "Not found" });
    return;
  }

  /* → fallback 500 */
  console.error(err);
  res.status(500).json({ error: "Server error" });
};
