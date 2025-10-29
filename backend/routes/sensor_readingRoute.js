/**
 * @swagger
 * tags:
 *   name: Sensor Readings
 *   description: API endpoints for managing IoT sensor data
 */

/**
 * @swagger
 * /sensor-readings:
 *   get:
 *     summary: Get all sensor readings
 *     tags: [Sensor Readings]
 *     responses:
 *       200:
 *         description: List of all sensor readings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SensorReading'
 */

/**
 * @swagger
 * /sensor-readings/device/{deviceId}:
 *   get:
 *     summary: Get all sensor readings for a specific device
 *     tags: [Sensor Readings]
 *     parameters:
 *       - in: path
 *         name: deviceId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Device ID
 *     responses:
 *       200:
 *         description: List of readings for the device
 */

/**
 * @swagger
 * /sensor-readings:
 *   post:
 *     summary: Create a new sensor reading
 *     tags: [Sensor Readings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SensorReading'
 *     responses:
 *       201:
 *         description: Sensor reading created successfully
 */

/**
 * @swagger
 * /sensor-readings/{readingId}:
 *   delete:
 *     summary: Delete a sensor reading by ID
 *     tags: [Sensor Readings]
 *     parameters:
 *       - in: path
 *         name: readingId
 *         schema:
 *           type: integer
 *         required: true
 *         description: Reading ID
 *     responses:
 *       200:
 *         description: Sensor reading deleted successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SensorReading:
 *       type: object
 *       properties:
 *         device_id:
 *           type: integer
 *           example: 1
 *         temperature:
 *           type: number
 *           example: 26.5
 *         humidity:
 *           type: number
 *           example: 58.2
 *         soil_moisture:
 *           type: number
 *           example: 43.1
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2025-10-29T10:00:00Z"
 */

const express = require('express');
const router = express.Router();

//import controller functions
const sensor_readingController = require('../controllers/sensor_readingController');
//import authentication middleware
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

//CRUD operations
//fetch all sensor readings
router.get('/', sensor_readingController.getAllReadings);

router.get('/latest', sensor_readingController.getLatestReading);

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