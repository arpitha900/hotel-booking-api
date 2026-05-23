const router = require('express').Router();
const { getUserList } = require('../controllers/user.controller');

router.get('/getUserList', getUserList);

module.exports = router;
