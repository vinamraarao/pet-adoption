const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  verifiedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
  rejectedPets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Pet' }],
});

module.exports = mongoose.model('Doctor', doctorSchema); 
