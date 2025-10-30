/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: API endpoints for managing IoT devices
 */

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Get all devices
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: List of all devices
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */

/**
 * @swagger
 * /devices/{id}:
 *   get:
 *     summary: Get a device by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Device ID
 *     responses:
 *       200:
 *         description: Device details by ID
 */

/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Create a new device
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       201:
 *         description: Device created successfully
 */

/**
 * @swagger
 * /devices/{id}:
 *   put:
 *     summary: Update an existing device by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Device ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Device'
 *     responses:
 *       200:
 *         description: Device updated successfully
 */

/**
 * @swagger
 * /devices/{id}:
 *   delete:
 *     summary: Delete a device by ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Device ID
 *     responses:
 *       200:
 *         description: Device deleted successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Greenhouse Sensor Node 1"
 *         description:
 *           type: string
 *           example: "Measures temperature, humidity, and soil moisture."
 *         location:
 *           type: string
 *           example: "Greenhouse Section A"
 */


//importing modules
const express = require('express');
const router = express.Router();

//importing controller functions
const deviceController = require('../controllers/deviceController');
//importing middleware to protect routes
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

//CRUD routes for devices
//Get al devices
router.get('/', deviceController.getAllDevices);

//get a specific device by ID
router.get('/:id', deviceController.getDeviceById);

//create a new device
router.post('/', deviceController.createDevice);

//update an existing device by ID
router.put('/:id', deviceController.updateDevice); 

//delete a device by id
router.delete('/:id', deviceController.deleteDevice);

module.exports = router;
