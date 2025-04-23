import cors from "cors";
import express from "express";
import { errorHandler, notFound } from "./middlewares/error.middleware";
import { authRouter } from "./routes/auth.routes";
import { columnRouter } from "./routes/column.routes";
import { taskRouter } from "./routes/task.routes";

// Configuration CORS avec l'URL spécifique
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000", // URL par défaut si la variable n'est pas définie
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true, // Pour permettre l'envoi de cookies si nécessaire
  optionsSuccessStatus: 200,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from backend 🎉" });
});
app.use("/api/auth", authRouter);
app.use("/api/columns", columnRouter);
app.use("/api/tasks", taskRouter);
app.use(notFound);
app.use(errorHandler);
app.listen(process.env.PORT || 4000, () =>
  console.log("Backend ready on port 4000")
);
