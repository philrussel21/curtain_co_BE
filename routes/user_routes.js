// set up routes for users
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  res.status(200).json({ message: "TEST: User Route" });
});

module.exports = router;