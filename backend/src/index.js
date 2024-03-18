import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();

// Configuration
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use("/auth", authRoutes);

app.use(authMiddleware);

// MongoDB Connection
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });