const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  checkin: String,
  checkout: String,
  person: Number,
  roomType: String,
});

module.exports = mongoose.model('Booking', bookingSchema);
