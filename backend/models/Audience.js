const mongoose = require('mongoose');

const audienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  criteria: {
    type: Object,
    required: true
  },
  visitCutoffDate: {
    type: Date,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Audience', audienceSchema);