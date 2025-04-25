import { Router } from "express";
import { ProjectController } from "../controllers/projects.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createProjectSchema,
  updateProjectSchema,
} from "../validators/project.schema";

export const projectRouter = Router();

projectRouter.use(authenticateJWT);

projectRouter.get("/", asyncHandler(ProjectController.list));

projectRouter.post(
  "/",
  validate(createProjectSchema),
  asyncHandler(ProjectController.create)
);

projectRouter.put(
  "/:id",
  validate(updateProjectSchema),
  asyncHandler(ProjectController.update)
);

projectRouter.delete("/:id", asyncHandler(ProjectController.remove));
