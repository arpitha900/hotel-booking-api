const locationService = require('../services/location.service');

const getStates = async (req, res, next) => {
  try {
    const states = await locationService.getAllStates();
    res.json({ success: true, data: states });
  } catch (err) {
    next(err);
  }
};

const getCities = async (req, res, next) => {
  try {
    const cities = await locationService.getCitiesByState(req.query.stateId);
    res.json({ success: true, data: cities });
  } catch (err) {
    next(err);
  }
};

module.exports = { getStates, getCities };
