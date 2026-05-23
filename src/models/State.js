const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema(
  {
    name:    { type: String, required: true, trim: true },
    code:    { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true, default: 'India' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('State', stateSchema);
