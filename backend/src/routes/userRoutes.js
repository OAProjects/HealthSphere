import express from "express";
import {
  allUsers,
  getUser,
  updatePassword,
  deleteUser,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// routes
router.put("/:id", authMiddleware, updatePassword);

// Routes restricted to admin user only
router.get(
  "/",
  authMiddleware,
  (req, res, next) => {
    // Check if the authenticated user is an admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access forbidden. Only admin user can access this route.",
      });
    }
    next();
  },
  allUsers
); // Only accessible by admin

router.get(
  "/:id",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access forbidden. Only admin user can access this route.",
      });
    }
    next();
  },
  getUser
);

router.delete(
  "/:id",
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Access forbidden. Only admin user can access this route.",
      });
    }
    next();
  },
  deleteUser
);

export default router;
