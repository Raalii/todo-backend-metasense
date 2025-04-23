import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from backend 🎉 s" });
});
app.listen(process.env.PORT || 4000, () =>
  console.log("Backend ready on port 4000")
);
