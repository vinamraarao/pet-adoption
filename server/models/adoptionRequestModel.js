const mongoose = require("mongoose");

const adoptionRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  reason: { type: String, required: true },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  requestedAt: { type: Date, default: Date.now },
});

const AdoptionRequest = mongoose.model("AdoptionRequest", adoptionRequestSchema);
module.exports = AdoptionRequest;
