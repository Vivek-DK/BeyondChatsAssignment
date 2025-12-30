import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import articleRoutes from "./routes/articleRoutes.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());
app.use("/api/articles", articleRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error("MongoDB connection failed:", err.message);
  });
