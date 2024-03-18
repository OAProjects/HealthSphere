import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, firstName, lastName, password, role } = req.body;

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.status(409).json({ error: "Email is already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, firstName, lastName, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", email, firstName, lastName, role });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User logged in successfully",
      email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Error logging user in:", error);
    res.status(500).json({ error: error.message });
  }
};
