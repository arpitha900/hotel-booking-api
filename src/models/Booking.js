const mongoose = require('mongoose');

const BOOKING_STATUS = {
  CONFIRMED: 0,
  CANCELLED: 1,
  COMPLETED: 2,
  PENDING:   3,
};

const bookingSchema = new mongoose.Schema(
  {
    userId:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotelId:         { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    checkInDate:     { type: Date, required: true },
    numberOfGuests:  { type: Number, required: true, min: 1 },
    status:          { type: Number, enum: [0, 1, 2, 3], default: BOOKING_STATUS.CONFIRMED },
    bookingDate:     { type: Date, default: Date.now },
    specialRequests: { type: String, trim: true },
  },
  { timestamps: true }
);

bookingSchema.index({ userId: 1, hotelId: 1, checkInDate: 1 }, { unique: true });
bookingSchema.index({ status: 1, checkInDate: 1 });

bookingSchema.statics.BOOKING_STATUS = BOOKING_STATUS;

module.exports = mongoose.model('Booking', bookingSchema);
