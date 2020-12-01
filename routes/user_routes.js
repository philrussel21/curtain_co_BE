const express = require('express');
const router = express.Router();
const { indexUsers, showUser, changeUser, deleteUser } = require('../controllers/users_controllers');

// TODO - differentiate what are for admin and for normal
// users
router.get('/', indexUsers);
router.get('/:id', showUser);
router.patch('/:id', changeUser);
router.delete('/:id', deleteUser);

module.exports = router;