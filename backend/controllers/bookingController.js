const Booking = require('../models/booking');
const Event = require('../models/event');


// Get recent bookings (e.g., for dashboard)
exports.getRecentBookings = async (req, res) => {
  try {
    const { organizerId } = req.params;
    const events = await Event.find({ organizerId });
    const eventIds = events.map(e => e._id);
    const bookings = await Booking.find({ eventId: { $in: eventIds } })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('eventId', 'name');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch recent bookings', error: err.message });
  }
};

// Get all bookings for organizer (with optional status filter)
exports.getAllBookingsByOrganizer = async (req, res) => {
  try {
    const { organizerId } = req.params;
    const { status } = req.query;

    // Step 1: Get all events created by this organizer
    const events = await Event.find({ organizerId });
    const eventIds = events.map(event => event._id);

    // Step 2: Query bookings related to those events
    const query = { eventId: { $in: eventIds } };
    if (status) {
      query.status = status; // e.g., status=cancelled
    }

    const bookings = await Booking.find(query)
      .sort({ createdAt: -1 })
      .populate('eventId', 'name');

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err.message });
  }
};
