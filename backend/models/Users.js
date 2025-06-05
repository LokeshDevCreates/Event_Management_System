const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, default: null },
    role: { type: String, enum: ['Attendee', 'Organizer', 'Admin'], required: true },
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
