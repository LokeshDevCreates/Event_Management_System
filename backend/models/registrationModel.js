import { Schema, model } from 'mongoose';

const RegistrationSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  eventId: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now }
});

export default model('Registration', RegistrationSchema);