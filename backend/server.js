const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');

// connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/bookings', require('./routes/bookingRoutes'));

// simple root
app.get('/', (_req, res) => res.send('Event‑Booking API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
