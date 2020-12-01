// set up routes for users
const express = require('express');
const router = express.Router();
const { indexUsers, showUser, changeUser } = require('../controllers/users_controllers');

router.get('/', indexUsers);
router.get('/:id', showUser);
router.patch('/:id', changeUser);

module.exports = router;