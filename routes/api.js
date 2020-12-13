// wrapper for all the routes

const express = require('express');
const router = express.Router();
const userRoutes = require('./user_routes');
const authRoutes = require('./auth_routes');
const consultRoutes = require('./consult_routes');
const productRoutes = require('./product_routes');
const { checkAuthenticated, checkAdmin } = require('../middlewares/auth');

// HOME PAGE
router.get('/', (req, res) => {
  res.status(200).json({ welcome_message: 'Hello World!', user: req.user });
});


router.use("/account", authRoutes);
router.use("/users", checkAuthenticated, userRoutes);
router.use("/consults", checkAuthenticated, checkAdmin, consultRoutes);
router.use("/products", productRoutes);


module.exports = router;