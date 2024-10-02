const express = require('express');
const router = express.Router();
const submitController = require('../controllers/submitController');

router.post('/submit-form', submitController.submitForm);

module.exports = router;

