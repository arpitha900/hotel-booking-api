const Joi = require('joi');

const objectId = Joi.string()
  .pattern(/^[a-fA-F0-9]{24}$/)
  .message('Must be a valid ID');

exports.createBookingSchema = Joi.object({
  userId:      objectId.required(),
  hotelId:     objectId.required(),
  checkinDate: Joi.date()
    .custom((value, helpers) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const checkIn = new Date(value);
      checkIn.setHours(0, 0, 0, 0);
      if (checkIn < today) return helpers.error('any.invalid');
      return value;
    })
    .required()
    .messages({
      'any.invalid':  'Check-in date must be today or in the future',
      'any.required': 'Check-in date is required',
    }),
  guestCount:   Joi.number().integer().min(1).max(20).required(),
  requirements: Joi.string().max(500).optional().allow(''),
});
