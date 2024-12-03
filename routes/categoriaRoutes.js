const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/cetegoryController');

router.get('/', CategoriaController.getCategories);

module.exports = router;
