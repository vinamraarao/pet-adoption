const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  userContact: { type: String, required: true },
  serviceType: { type: String, required: true },
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  petBreed: { type: String },
  address: { type: String, required: true },
  time: { type: String, required: true },
  careDuration: { type: Number },
  specialInstructions: { type: String },
  status: { type: String, default: "Pending" },
  assignedPetShop: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);