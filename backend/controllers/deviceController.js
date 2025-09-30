//Imports the device model module, which contains functions 
//to query and manipulate the devices table in the database.
const deviceModel = require('../models/deviceModel');

//retrieves all devices by calling the model function.
//Sends the list of devices with HTTP 200 (OK) status.
//If there's an error, responds with HTTP 500 (Internal Server Error).
async function getAllDevices(req, res) {
  try {
    const devices = await deviceModel.getAllDevices();
    res.status(200).json(devices);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch devices' });
  }
}

//Getting a device ID from the URL parameters, converting it to a number.
//Retrieves that specific device from the database.
//If the device doesn't exist, sends HTTP 404 (Not Found).
//Otherwise, sends the device data with HTTP 200.
//Catches and handles errors with HTTP 500.
async function getDeviceById(req, res) {
  try {
    const device = await deviceModel.getDeviceById(parseInt(req.params.id));
    if (!device) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.status(200).json(device);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch device' });
  }
}

//creates a new device using data from the request body.
//Inserts a new device record using the model.
//Responds with HTTP 201 (Created) and the new record.
//Sends HTTP 500 if any error occurs.

async function createDevice(req, res) {
  try {
    const { device_name, location } = req.body;
    const newDevice = await deviceModel.createDevice(device_name, location);
    res.status(201).json(newDevice);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create device' });
  }
}


//
