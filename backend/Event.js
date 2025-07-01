import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  location: String,
  foodItems: [String],
  price: Number,
  offer: String,
  seats: Number,
  eventImages: [String],
  category: String,
  bookedSeats: Number,
  venueCoords: {
    lat: Number,
    lng: Number
  }
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
