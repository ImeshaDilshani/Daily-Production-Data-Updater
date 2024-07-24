const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

router.get('/line', employeesController.getAllLine);
router.get('/epf-number', employeesController.getAllEpfNumber);
router.get('/full-name', employeesController.getAllFullName);
router.post('/search-employees', employeesController.searchEmployees);

module.exports = router;
