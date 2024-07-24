const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/packing-items', productController.getAllPackingItems);
router.get('/packing-types', productController.getAllPackingTypes);
router.get('/lines', productController.getAllLines);
router.post('/search-products', productController.searchProducts);

module.exports = router;
