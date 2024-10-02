const express = require('express');
const router = express.Router();
const dataRetriveController = require('../controllers/dataRetriveController');
const ExcelJS = require('exceljs');


router.get('/get-data', dataRetriveController.getDataController);

// Route for exporting data as Excel
router.get('/export-excel', dataRetriveController.exportExcelController);

module.exports = router;
