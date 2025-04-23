import cors from "cors";
import express from "express";
import { errorHandler, notFound } from "./middlewares/error.middleware";
import { authRouter } from "./routes/auth.routes";
import { columnRouter } from "./routes/column.routes";
import { taskRouter } from "./routes/task.routes";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/columns", columnRouter);
app.use("/api/tasks", taskRouter);
app.use(notFound);
app.use(errorHandler);
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from backend 🎉 ss" });
});
app.listen(process.env.PORT || 4000, () =>
  console.log("Backend ready on port 4000")
);
