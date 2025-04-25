import { Router } from "express";
import { CategoryController } from "../controllers/categories.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/category.schema";

export const categoryRouter = Router();

categoryRouter.use(authenticateJWT);

categoryRouter.get("/", asyncHandler(CategoryController.list));

categoryRouter.post(
  "/",
  validate(createCategorySchema),
  asyncHandler(CategoryController.create)
);

categoryRouter.put(
  "/:id",
  validate(updateCategorySchema),
  asyncHandler(CategoryController.update)
);

categoryRouter.delete("/:id", asyncHandler(CategoryController.remove));
