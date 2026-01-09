import express from "express";
import tasksRoutes from "./routes/tasksRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors());

app.use("/api/tasks", tasksRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("🚀 ~ server is running on port:", PORT);
  });
});
