const bookingService = require('../services/booking.service');

const getBookings = async (req, res, next) => {
  try {
    const result = await bookingService.getBookings(req.query, res);
    // result is undefined when download=true (response already sent by excelExport)
    if (result) res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json({ success: true, message: 'Booking created successfully', data: booking });
  } catch (err) {
    next(err);
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.cancelBooking(req.params.bookingId);
    res.json({ success: true, message: 'Booking cancelled successfully', data: booking });
  } catch (err) {
    next(err);
  }
};

const getBookedUsers = async (req, res, next) => {
  try {
    const users = await bookingService.getBookedUsers();
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
};

module.exports = { getBookings, createBooking, cancelBooking, getBookedUsers };
