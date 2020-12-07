// wrapper for all the routes

const express = require('express');
const router = express.Router();
const userRoutes = require('./user_routes');
const authRoutes = require('./auth_routes');

router.use("/account", authRoutes);
router.use("/users", userRoutes);

module.exports = router;