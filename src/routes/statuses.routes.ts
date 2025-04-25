import { Router } from "express";
import { StatusController } from "../controllers/statuses.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { asyncHandler } from "../utils/asyncHandler";

import {
  createStatusSchema,
  updateStatusSchema,
} from "../validators/status.schema";
import { validate } from "../middlewares/validate.middleware";

export const statusRouter = Router();

statusRouter.use(authenticateJWT);

statusRouter.get("/", asyncHandler(StatusController.list));

statusRouter.post(
  "/",
  validate(createStatusSchema),
  asyncHandler(StatusController.create)
);

statusRouter.put(
  "/:id",
  validate(updateStatusSchema),
  asyncHandler(StatusController.update)
);

statusRouter.delete("/:id", asyncHandler(StatusController.remove));
