const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth_controller');
// TODO - move logic to controllers
router.get('/', (req, res) => {
  res.status(200).json({ message: "TEST: Reached Auth routes" });
});
router.post('/', login);
router.post('/register', register);

module.exports = router;