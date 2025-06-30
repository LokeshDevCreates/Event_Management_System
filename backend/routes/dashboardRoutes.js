// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const {
  getDashboardSummary,
  getRecentBookings
} = require('../controllers/dashboardController');

router.get('/summary/:organizerId', getDashboardSummary);
router.get('/bookings/:organizerId', getRecentBookings);

module.exports = router;
