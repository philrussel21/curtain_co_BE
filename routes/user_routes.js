// set up routes for users
const express = require('express');
const router = express.Router();
const { indexUsers, showUser } = require('../controllers/users_controllers');

router.get('/:email', showUser);
router.get('/', indexUsers);

module.exports = router;