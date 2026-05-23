const Hotel = require('../models/Hotel');
const { getPaginationParams, buildPaginationMeta } = require('../utils/pagination');

const getHotelList = async (query) => {
  const { page, limit, skip, sort } = getPaginationParams(query);

  const filter = {};

  if (query.search) {
    const escaped = query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.name   = new RegExp(escaped, 'i');
  }
  if (query.stateId)  filter.stateId  = query.stateId;
  if (query.cityId)   filter.cityId   = query.cityId;
  if (query.rating)   filter.rating   = Number(query.rating);
  if (query.isActive !== undefined && query.isActive !== '') {
    filter.isActive = query.isActive === 'true';
  }

  const [hotels, total] = await Promise.all([
    Hotel.find(filter)
      .populate('cityId',  'name')
      .populate('stateId', 'name code')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Hotel.countDocuments(filter),
  ]);

  return { data: hotels, pagination: buildPaginationMeta(total, page, limit) };
};

module.exports = { getHotelList };
