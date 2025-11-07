const mongoose = require('mongoose');

const carbonFootprintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  breakdown: {
    transportation: { type: Number, default: 0 },
    energy: { type: Number, default: 0 },
    diet: { type: Number, default: 0 },
    waste: { type: Number, default: 0 }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CarbonFootprint', carbonFootprintSchema);
