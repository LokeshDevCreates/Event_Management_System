// routes/eventRoutes.js
const express = require('express');
const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getNearbyEvents
} = require('../controllers/eventController');

router.get('/test', (req, res) => res.send('Event route working ✅'));

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

// New route for nearby events
router.get('/nearby/search', getNearbyEvents);

module.exports = router;
