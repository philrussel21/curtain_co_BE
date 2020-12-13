const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkAdmin } = require('../middlewares/auth');;
const { indexProducts, createProduct, showProduct, updateProduct, deleteProduct, changeProduct } = require('../controllers/products_controller');

// consider PRODUCT CATEGORY/TYPE middleware

router.get('/', indexProducts);
router.post('/', createProduct);
router.get('/:id', showProduct);
router.patch('/:id', changeProduct);
router.delete('/:id', deleteProduct);

module.exports = router;