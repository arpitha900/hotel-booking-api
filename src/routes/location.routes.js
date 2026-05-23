const router = require('express').Router();
const { getStates, getCities } = require('../controllers/location.controller');

router.get('/state', getStates);
router.get('/city',  getCities);

module.exports = router;
