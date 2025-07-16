const mongoose = require("mongoose");

const approvedPetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  age: { type: String, required: true },
  location: { type: String, required: true },
  petType: { type: String, required: true },
  justification: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  petImage: { type: String },
  vaccinationFile: { type: String },
  status: { type: String, default: "approved" },
});

module.exports = mongoose.model("ApprovedPet", approvedPetSchema);