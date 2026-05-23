const User = require('../models/User');
const { getPaginationParams, buildPaginationMeta } = require('../utils/pagination');

const getUserList = async (query) => {
  const { page, limit, skip, sort } = getPaginationParams(query);

  const filter = {};

  if (query.search) {
    const escaped = query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex   = new RegExp(escaped, 'i');
    filter.$or    = [{ name: regex }, { email: regex }, { phone: regex }];
  }

  const [users, total] = await Promise.all([
    User.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    User.countDocuments(filter),
  ]);

  return { data: users, pagination: buildPaginationMeta(total, page, limit) };
};

module.exports = { getUserList };
