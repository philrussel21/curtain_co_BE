const express = require('express');
const router = express.Router();
const { checkAuthenticated, checkAdmin } = require('../middlewares/auth');
const { indexCollections, showCollection, createCollection, changeCollection, deleteCollection } = require('../controllers/collections_controller');
const { addCollection } = require('../utils/collections');

router.get('/', indexCollections);
router.post('/', checkAuthenticated, checkAdmin, addCollection);
router.get('/:id', showCollection);
router.patch('/:id', checkAuthenticated, checkAdmin, changeCollection);
router.delete('/:id', checkAuthenticated, checkAdmin, deleteCollection);