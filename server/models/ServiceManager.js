const mongoose = require('mongoose');

const ServiceManagerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('ServiceManager', ServiceManagerSchema);