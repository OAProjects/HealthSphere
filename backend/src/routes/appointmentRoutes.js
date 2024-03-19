import express from "express";
import { createAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

// Define route for creating a new appointment
router.post("/", createAppointment);

export default router;
