const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  age: { type: String, required: true },
  location: { type: String, required: true },
  petType: { type: String, required: true },
  justification: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  petImage: { type: String, required: true },
  vaccinationFile: { type: String, required: false },
  prescriptionFile: { type: String },
  status: { type: String, default: "verification_pending" },
  appointmentDetails: {
    date: { type: String },
    time: { type: String },
    location: { type: String },
    notes: { type: String },
  },
});

module.exports = mongoose.model("Pet", petSchema);