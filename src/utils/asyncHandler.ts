import { RequestHandler } from "express";

/**
 * Accepte n’importe quel contrôleur asynchrone (qui peut
 * retourner quelque chose) et l’enveloppe dans un RequestHandler
 * qui propage les erreurs à `next()`.
 */
export const asyncHandler =
  (fn: (...args: any[]) => any): RequestHandler =>
  (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);
