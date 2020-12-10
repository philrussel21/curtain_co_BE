const express = require('express');
const router = express.Router();
const { indexConsults, showConsult, createConsult, deleteConsult } = require('../controllers/consults_controller');


router.get('/', indexConsults);
router.post('/', createConsult);
router.get('/:id', showConsult);
router.delete('/:id', deleteConsult);

module.exports = router;