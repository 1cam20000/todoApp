import express from "express";
import tasksRoutes from "./routes/tasksRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
if (process.env.NODE_ENV !== "development") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use("/api/tasks", tasksRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Fallback cho SPA: dùng mẫu hợp lệ Express v5
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("🚀 ~ server is running on port:", PORT);
  });
});
