import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { body } from "express-validator";

const router = express.Router();

// Validation rules for registering a new user
const registerValidationRules = [
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Invalid email address format"),
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  body("role").notEmpty().withMessage("Role is required"),
  body("role").isIn(["patient", "doctor", "admin"]).withMessage("Invalid role type"),
];

// applying the validation rules to the register route
router.post("/register", registerValidationRules, registerUser);
router.post("/login", loginUser);

export default router;