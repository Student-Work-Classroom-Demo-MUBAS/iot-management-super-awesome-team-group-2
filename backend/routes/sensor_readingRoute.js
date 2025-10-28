const express = require('express');
const router = express.Router();

//import controller functions
const sensor_readingController = require('../controllers/sensor_readingContoller');
//import authentication middleware
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

//CRUD operations
//fetch all sensor readings
router.get('/', sensor_readingController.getAllReadings);

//GET api/sensor_readings/device/:deviceId
// fetch all readings for a specific device
router.get('/device/:deviceId', sensor_readingController.getReadingsByDeviceId);

//POST api/sensor-readings
//create a new sensor reading
router.post('/', sensor_readingController.createReading);

//DELETE /api/sensor-readings/:readingId
//delete a sensor by Id
router.delete('/:readingId', sensor_readingController.deleteReading);

//export router
module.exports = router;