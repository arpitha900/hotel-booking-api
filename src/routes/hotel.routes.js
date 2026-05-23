const router = require('express').Router();
const { getHotelList } = require('../controllers/hotel.controller');

router.get('/getHotelList', getHotelList);

module.exports = router;
