const mongoose = require("mongoose");

const userPetSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  petType: String,
  justification: String,
  timeAgo: String,
});

module.exports = mongoose.model("UserPet", userPetSchema); 