import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  userName: String,
  userEmail: String,
  userPhone: String,
  seatsBooked: Number,
  bookingTime: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
