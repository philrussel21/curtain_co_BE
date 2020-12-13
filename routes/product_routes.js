const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkAdmin } = require('../middlewares/auth');;
const { indexProducts, createProduct, showProduct, updateProduct, deleteProduct, changeProduct } = require('../controllers/products_controller');


router.get('/', indexProducts);
router.post('/', checkAuthenticated, checkAdmin, createProduct);
router.get('/:id', showProduct);
router.patch('/:id', checkAuthenticated, checkAdmin, changeProduct);
router.delete('/:id', checkAuthenticated, checkAdmin, deleteProduct);

module.exports = router;