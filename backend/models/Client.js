const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  totalSpends: {
    type: Number,
    required: true
  },
  maxVisits: {
    type: Number,
    required: true
  },
  lastVisit: {
    type: Date,
    required: true
  },
});

module.exports = mongoose.model('Client', clientSchema);