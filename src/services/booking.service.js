const mongoose = require('mongoose');
const Booking  = require('../models/Booking');
const User     = require('../models/User');
const Hotel    = require('../models/Hotel');
const AppError = require('../utils/AppError');
const { getPaginationParams, buildPaginationMeta } = require('../utils/pagination');
const { exportBookingsToExcel } = require('../utils/excelExport');

const BOOKING_STATUS = Booking.BOOKING_STATUS;

const buildBookingFilter = (query) => {
  const filter = {};

  if (query.userId)  filter.userId  = query.userId;
  if (query.hotelId) filter.hotelId = query.hotelId;

  if (query.status !== undefined && query.status !== '') {
    filter.status = Number(query.status);
  }

  if (query.fromDate || query.toDate) {
    filter.checkInDate = {};
    if (query.fromDate) filter.checkInDate.$gte = new Date(query.fromDate);
    if (query.toDate)   filter.checkInDate.$lte = new Date(query.toDate);
  }

  return filter;
};

const populateBooking = (query) =>
  query
    .populate('userId',  'name email phone')
    .populate({
      path:     'hotelId',
      select:   'name location cityId stateId',
      populate: [
        { path: 'cityId',  select: 'name' },
        { path: 'stateId', select: 'name' },
      ],
    });

const getBookings = async (query, res) => {
  const filter = buildBookingFilter(query);

  if (query.download === 'true') {
    const bookings = await populateBooking(
      Booking.find(filter).sort({ createdAt: -1 })
    ).lean();
    return exportBookingsToExcel(bookings, res);
  }

  const { page, limit, skip, sort } = getPaginationParams(query);

  const [bookings, total] = await Promise.all([
    populateBooking(Booking.find(filter).sort(sort).skip(skip).limit(limit)).lean(),
    Booking.countDocuments(filter),
  ]);

  return { data: bookings, pagination: buildPaginationMeta(total, page, limit) };
};

const createBooking = async (body) => {
  const { userId, hotelId, checkinDate, guestCount, requirements } = body;

  // Normalize to local-midnight for comparison (avoids UTC-parse shifting the date)
  const checkIn = new Date(checkinDate);
  checkIn.setHours(0, 0, 0, 0);

  const toLocalDateStr = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  // 9 PM rule: after 9 PM, next-calendar-day bookings are blocked
  const now      = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
  if (minutesSinceMidnight > 21 * 60 && toLocalDateStr(checkIn) === toLocalDateStr(tomorrow)) {
    throw new AppError(
      'Bookings for tomorrow cannot be made after 9 PM. Please try again tomorrow.',
      400
    );
  }

  // Validate user and hotel exist
  const [userExists, hotelExists] = await Promise.all([
    User.findById(userId).lean(),
    Hotel.findById(hotelId).lean(),
  ]);

  if (!userExists)  throw new AppError('User not found', 404);
  if (!hotelExists) throw new AppError('Hotel not found', 404);
  if (!hotelExists.isActive) throw new AppError('Hotel is not accepting bookings', 400);

  // Duplicate booking check: same user + same hotel + same check-in date
  const duplicate = await Booking.findOne({ userId, hotelId, checkInDate: checkIn });
  if (duplicate) {
    throw new AppError('You already have a booking at this hotel for the selected date', 409);
  }

  const booking = await Booking.create({
    userId,
    hotelId,
    checkInDate:     checkIn,
    numberOfGuests:  guestCount,
    status:          BOOKING_STATUS.CONFIRMED,
    bookingDate:     now,
    specialRequests: requirements || undefined,
  });

  return populateBooking(Booking.findById(booking._id)).lean();
};

const cancelBooking = async (bookingId) => {
  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new AppError('Invalid booking ID', 400);
  }

  const booking = await Booking.findById(bookingId);
  if (!booking) throw new AppError('Booking not found', 404);

  if (booking.status === BOOKING_STATUS.CANCELLED) {
    throw new AppError('Booking is already cancelled', 400);
  }
  if (booking.status === BOOKING_STATUS.COMPLETED) {
    throw new AppError('Completed bookings cannot be cancelled', 400);
  }

  booking.status = BOOKING_STATUS.CANCELLED;
  await booking.save();

  return booking;
};

const getBookedUsers = async () => {
  const userIds = await Booking.distinct('userId');
  return User.find({ _id: { $in: userIds } }).select('name email').sort({ name: 1 }).lean();
};

module.exports = { getBookings, createBooking, cancelBooking, getBookedUsers };
