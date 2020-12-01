const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/auth_controller');
// TODO - move logic to controllers
router.get('/', (req, res) => {
  res.status(200).json({ message: "TEST: Reached Auth routes" });
});
router.post('/', login);
router.post('/register', register);
router.get('/logout', logout);

module.exports = router;