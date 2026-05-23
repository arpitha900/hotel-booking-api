const userService = require('../services/user.service');

const getUserList = async (req, res, next) => {
  try {
    const result = await userService.getUserList(req.query);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

module.exports = { getUserList };
