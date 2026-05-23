const State = require('../models/State');
const City  = require('../models/City');

const getAllStates = async () => {
  return State.find().sort({ name: 1 }).lean();
};

const getCitiesByState = async (stateId) => {
  const filter = stateId ? { stateId } : {};
  return City.find(filter).populate('stateId', 'name code').sort({ name: 1 }).lean();
};

module.exports = { getAllStates, getCitiesByState };
