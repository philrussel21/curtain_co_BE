// wrapper for all the routes

const express = require('express');
const router = express.Router();
const userRoutes = require('./user_routes');
const authRoutes = require('./auth_routes');
const consultRoutes = require('./consult_routes');
const productRoutes = require('./product_routes');
const collectionRoutes = require('./collection_routes');
const orderRoutes = require('./order_routes');
const { checkAuthenticated, checkAdmin } = require('../middlewares/auth');
const { singleUpload } = require('../config/file_upload');

// HOME PAGE
router.get('/', (req, res) => {
  res.status(200).json({ welcome_message: 'Hello World!', user: req.user });
});


router.use("/account", authRoutes);
router.use("/users", checkAuthenticated, userRoutes);
router.use("/consults", consultRoutes);
router.use("/products", productRoutes);
router.use("/collections", collectionRoutes);
router.use("/orders", checkAuthenticated, orderRoutes);


// Route for uploads to S3
router.post('/upload', checkAuthenticated, checkAdmin, (req, res) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.status(422).json({ message: 'File Upload Error', error: err.message });
    }
    res.status(201).json({ 'image': req.file });
  });
});


module.exports = router;