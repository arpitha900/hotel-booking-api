const hotelService = require('../services/hotel.service');

const getHotelList = async (req, res, next) => {
  try {
    const result = await hotelService.getHotelList(req.query);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getHotelList };
