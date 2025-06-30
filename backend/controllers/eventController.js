// controllers/eventController.js
const Event = require('../models/event');
const Organizer = require('../models/organizer');

// Helper to check overlap
const hasOverlap = async (coordinates, date, startTime, endTime, excludeId = null) => {
  const query = {
    'location.coordinates': coordinates,
    date,
    $or: [
      { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
    ]
  };
  if (excludeId) query._id = { $ne: excludeId };
  const overlappingEvent = await Event.findOne(query);
  return !!overlappingEvent;
};

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const {
      name, organizerId, date, startTime, endTime,
      location, description, arrangements,
      foodItems, seats, price, eventType, eventImages, offer
    } = req.body;

    if (!name || !organizerId || !date || !startTime || !endTime || !location || seats < 0 || price < 0 || !eventType || !Array.isArray(eventImages) || eventImages.length === 0) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }

    const { type, coordinates } = location;
    if (type !== 'Point' || !Array.isArray(coordinates) || coordinates.length !== 2) {
      return res.status(400).json({ message: 'Invalid location format' });
    }

    const overlap = await hasOverlap(coordinates, date, startTime, endTime);
    if (overlap) return res.status(409).json({ message: 'Event time overlaps at this location' });

    const organizer = await Organizer.findById(organizerId);
    if (!organizer) return res.status(404).json({ message: 'Organizer not found' });

    const newEvent = new Event({
      name,
      organizerId,
      organizerName: organizer.name,
      organizerEmail: organizer.email,
      organizerPhone: organizer.phone,
      location: { type, coordinates },
      date,
      startTime,
      endTime,
      description,
      arrangements,
      foodItems,
      seats,
      bookedSeats: 0,
      price,
      offer,
      eventType,
      eventImages
    });

    const saved = await newEvent.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Create event error:", err);
    res.status(500).json({ message: 'Error creating event', error: err.message });
  }
};

// Get All Events (with filters)
exports.getAllEvents = async (req, res) => {
  try {
    const { date, eventType } = req.query;
    const filter = {};
    if (date) filter.date = date;
    if (eventType) filter.eventType = eventType;
    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err.message });
  }
};

// Get Event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching event', error: err.message });
  }
};

// Update Event
exports.updateEvent = async (req, res) => {
  try {
    const {
      name, organizerId, date, startTime, endTime,
      location, description, arrangements,
      foodItems, seats, price, eventType, eventImages, offer
    } = req.body;

    if (!name || !organizerId || !date || !startTime || !endTime || !location || seats < 0 || price < 0 || !eventType || !Array.isArray(eventImages)) {
      return res.status(400).json({ message: 'Missing or invalid fields' });
    }

    const { type, coordinates } = location;
    if (type !== 'Point' || !Array.isArray(coordinates) || coordinates.length !== 2) {
      return res.status(400).json({ message: 'Invalid location format' });
    }

    const overlap = await hasOverlap(coordinates, date, startTime, endTime, req.params.id);
    if (overlap) return res.status(409).json({ message: 'Event time overlaps at this location' });

    const organizer = await Organizer.findById(organizerId);
    if (!organizer) return res.status(404).json({ message: 'Organizer not found' });

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      {
        name,
        organizerId,
        organizerName: organizer.name,
        organizerEmail: organizer.email,
        organizerPhone: organizer.phone,
        location: { type, coordinates },
        date,
        startTime,
        endTime,
        description,
        arrangements,
        foodItems,
        seats,
        price,
        offer,
        eventType,
        eventImages
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Event not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error updating event', error: err.message });
  }
};

// Delete Event
exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully', deleted });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting event', error: err.message });
  }
};

// Nearby Events by coordinates
exports.getNearbyEvents = async (req, res) => {
  try {
    const { lat, lng, maxDistance = 10000 } = req.query;
    if (!lat || !lng) return res.status(400).json({ message: 'Latitude and longitude required' });

    const events = await Event.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseFloat(maxDistance)
        }
      }
    });

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching nearby events', error: err.message });
  }
};
