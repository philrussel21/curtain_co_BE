// set up routes for users
const express = require('express');
const router = express.Router();
const { indexUsers } = require('../controllers/users_controllers');

router.get('/', indexUsers);

module.exports = router;