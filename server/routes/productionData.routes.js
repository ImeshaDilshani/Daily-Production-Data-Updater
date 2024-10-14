// productionData.routes.js

const express = require('express');
const router = express.Router();
const productionDataController = require('../controllers/productionData.controller');

// Route to submit production data
router.post('/submit-production-data', productionDataController.submitProductionData);

module.exports = router;
