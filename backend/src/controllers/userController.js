import User from "../models/User.js";
import bcrypt from "bcrypt";
import Appointment from "../models/Appointment.js";

export const allUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({}, { password: 0, __v: 0 }).lean(); // Exclude password and __v field from the response

    // If no users found, return empty array
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    // Return users array
    res.status(200).json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id, { password: 0, __v: 0 }).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let appointments = [];

    // Fetch appointments based on user's role
    if (user.role === 'patient') {
      appointments = await Appointment.find({ patient: id })
        .populate('doctor', 'firstName lastName') // Populate doctor details (first name and last name)
        .lean();
    } else if (user.role === 'doctor') {
      appointments = await Appointment.find({ doctor: id })
        .populate('patient', 'firstName lastName') // Populate patient details (first name and last name)
        .lean();
    }

    // Include appointments in the user response
    user.appointments = appointments;

    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: error.message });
  }
};

export const updatePassword = async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided current password matches the stored password
    const passwordMatch = await bcrypt.compare(currentPassword, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    // Hash the new password
    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
	try {
		const {id} = req.params;
    const user = await User.findById(id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		await user.deleteOne();
		res.status(200).json({ message: "User deleted successfully" });
	} catch (error) {
		console.error("Error updating password:", error);
    res.status(500).json({ error: error.message });
	}
};
