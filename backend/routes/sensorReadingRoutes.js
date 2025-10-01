const express = require('express');
const router = express.Router();
const sensorReadingController = require('../controllers/sensorReadingController');

// Register POST route at /api/sensor-readings
router.post('/', sensorReadingController.createReading);

module.exports = router;
