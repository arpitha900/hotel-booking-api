const router   = require('express').Router();
const validate = require('../middleware/validate');
const { createBookingSchema } = require('../validations/booking.validation');
const {
  getBookings,
  createBooking,
  cancelBooking,
  getBookedUsers,
} = require('../controllers/booking.controller');

router.get('/getBookings',           getBookings);
router.get('/getBookedUsers',        getBookedUsers);
router.post('/createBooking',        validate(createBookingSchema), createBooking);
router.post('/:bookingId/cancel',    cancelBooking);

module.exports = router;
