const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');

router.get('/activities-item', activitiesController.getAllActivityName);

module.exports = router; // Ensure this export statement is correct
