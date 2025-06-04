const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  eventId: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', RegistrationSchema);