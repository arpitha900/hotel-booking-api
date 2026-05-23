const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema(
  {
    name:          { type: String, required: true, trim: true },
    location:      { type: String, required: true, trim: true },
    cityId:        { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true },
    stateId:       { type: mongoose.Schema.Types.ObjectId, ref: 'State', required: true },
    country:       { type: String, default: 'India', trim: true },
    rating:        { type: Number, min: 1, max: 5, required: true },
    amenities:     { type: [String], default: [] },
    pricePerNight: { type: Number, required: true },
    description:   { type: String, trim: true },
    isActive:      { type: Boolean, default: true },
  },
  { timestamps: true }
);

hotelSchema.index({ name: 'text' });
hotelSchema.index({ cityId: 1, stateId: 1, rating: 1, isActive: 1 });

module.exports = mongoose.model('Hotel', hotelSchema);
