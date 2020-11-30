// wrapper for all the routes

const express = require('express');
const router = express.Router();
const userRoutes = require('./user_routes');

router.use("/account", userRoutes);

module.exports = router;