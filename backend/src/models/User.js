import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
		max: 30,
  },
  firstName: {
    type: String,
    required: true,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,
    max: 20,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  role: {
    type: String,
    enum: ['patient', 'doctor', 'admin'],
    required: true
  },
});

const User = mongoose.model("User", userSchema);
export default User;
