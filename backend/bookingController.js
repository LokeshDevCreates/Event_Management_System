import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Booking failed' });
  }
};

export const getAllBookings = async (_req, res) => {
  try {
    const bookings = await Booking.find().populate('eventId');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};
