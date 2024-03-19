import express from "express";
import { allUsers, getUser, updatePassword, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// Get routes
router.get("/", allUsers);
router.get("/:id", getUser);

// Put routes
router.put("/:id", updatePassword);

// Delete routes
router.delete("/:id", deleteUser);

export default router;
