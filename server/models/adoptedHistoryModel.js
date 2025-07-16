const mongoose = require("mongoose");

const adoptedHistorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  petId: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
  petName: { type: String, required: true },
  petType: { type: String, required: true },
  petImage: { type: String }, // Add petImage field to store the image path
  adoptedAt: { type: Date, default: Date.now },
});

const AdoptedHistory = mongoose.model("AdoptedHistory", adoptedHistorySchema);
module.exports = AdoptedHistory;
