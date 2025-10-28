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
router.put('//:id', deviceController.updateDevice); 

//delete a device by id
router.delete('/:id', deviceController.deleteDevice);

module.exports = router;
