import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import eventRoutes from './routes/eventRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
