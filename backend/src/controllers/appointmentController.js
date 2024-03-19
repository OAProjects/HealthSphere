import Appointment from "../models/Appointment.js";

export const createAppointment = async (req, res) => {
  try {
    // Extract data from the request body
    const { patientId, doctorId, reason, dateTime } = req.body;

    // Create a new appointment object
    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      reason,
      dateTime,
    });

    // Save the appointment to the database
    await newAppointment.save();

    // Return success response
    res
      .status(201)
      .json({
        message: "Appointment booked successfully",
        appointment: newAppointment,
      });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: error.message });
  }
};
