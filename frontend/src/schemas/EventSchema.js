// models/event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Organizer', required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, default: '' },
  arrangements: { type: [String], default: [] },
  foodItems: { type: [String], default: [] },
  seats: { type: Number, required: true },
  bookedSeats: { type: Number, default: 0 },
  price: { type: Number, required: true, min: 0 },
  eventType: {
    type: [String],
    enum: ['Conference', 'Workshop', 'Seminar', 'Wedding', 'Family', 'Party', 'Concert', 'Exhibition', 'Trending', 'Hot', 'Mostbooked', 'Other'],
    default: ['Other']
  },
  eventImages: [{
    type: String,
    validate: {
      validator: v => /^https?:\/\/[^\s]+(\.jpg|\.jpeg|\.png|\.gif|\.webp)?$/i.test(v),
      message: props => `${props.value} is not a valid image URL!`
    },
    required: true
  }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
