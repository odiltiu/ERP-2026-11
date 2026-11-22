import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import postRoutes from "./routes/postRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://odiltiu_db_user:C0gKPZsy4RzF5GZX@cluster0.g1tnb9m.mongodb.net/najot-talim?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Najot Ta'lim ERP Backend API ishlamoqda 🚀",
    endpoints: {
      auth: ["POST /api/auth/register", "POST /api/auth/login"],
      users: ["GET /api/users", "POST /api/users"],
      todos: ["GET /api/todos", "POST /api/todos", "PUT /api/todos/:id", "DELETE /api/todos/:id"],
      posts: ["GET /api/posts", "POST /api/posts", "DELETE /api/posts/:id"],
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/todos", todoRoutes);
app.use("/api/posts", postRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas bazasiga muvaffaqiyatli ulandi!");
    app.listen(PORT, () => {
      console.log(`🚀 Server http://localhost:${PORT} portida ishga tushdi`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Atlas ulanish xatosi:", err.message);
    app.listen(PORT, () => {
      console.log(`⚠️ Server MongoDB siz http://localhost:${PORT} da ishga tushdi`);
    });
  });
