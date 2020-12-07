const express = require('express');
const router = express.Router();
const { checkAdmin, checkAdminOrOwner, checkAuthenticated, checkNotAuthenticated } = require('../middlewares/auth');
const { indexUsers, showUser, changeUser, deleteUser } = require('../controllers/users_controllers');

// TODO - differentiate what are for admin and for normal
// users
router.get('/', checkAuthenticated, checkAdmin, indexUsers);
router.get('/:id', checkAuthenticated, checkAdminOrOwner, showUser);
router.patch('/:id', checkAuthenticated, checkAdminOrOwner, changeUser);
router.delete('/:id', checkAuthenticated, checkAdminOrOwner, deleteUser);

module.exports = router;