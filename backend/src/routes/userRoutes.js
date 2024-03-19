import express from "express";
import {
  allUsers,
  getUser,
  updatePassword,
  deleteUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js"; // Import the authMiddleware

const router = express.Router();

// Get routes
router.get("/", authMiddleware, allUsers);
router.get("/:id", authMiddleware, getUser);

// Put routes
router.put("/:id", authMiddleware, updatePassword);

// Delete routes
router.delete("/:id", authMiddleware, deleteUser);

export default router;
