import { Router } from "express";
import {
  createColumn,
  deleteColumn,
  getColumns,
  updateColumn,
} from "../controllers/column.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import {
  createColumnSchema,
  updateColumnSchema,
} from "../validators/column.validator";

export const columnRouter = Router();
columnRouter.use(authenticateJWT);
columnRouter.get("/", getColumns);
columnRouter.post("/", validate(createColumnSchema), createColumn);
columnRouter.put("/:id", validate(updateColumnSchema), updateColumn);
columnRouter.delete("/:id", deleteColumn);
