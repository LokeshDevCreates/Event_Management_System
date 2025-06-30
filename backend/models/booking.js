const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  attendeeName: {
    type: String,
    required: true
  },
  attendeeEmail: {
    type: String,
    required: true
  },
  seats: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
