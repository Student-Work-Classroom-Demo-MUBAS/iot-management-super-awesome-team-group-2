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


//Takes the device ID from URL and new data from request body.
//Updates the record in the DB.
//Sends 404 if device for update doesn't exist.
//Otherwise sends updated device record with 200 status.
//Handles errors with 500.

async function updateDevice(req, res) {
  try {
    const deviceId = parseInt(req.params.id);
    const { device_name, location } = req.body;
    const updatedDevice = await deviceModel.updateDevice(deviceId, device_name, location);
    if (!updatedDevice) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.status(200).json(updatedDevice);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update device' });
  }
}


//Deletes a device by ID.
//Sends 404 if not found, or success message with 200 if deleted.
//Handles errors with 500
async function deleteDevice(req, res) {
  try {
    const deviceId = parseInt(req.params.id);
    const deletedDevice = await deviceModel.deleteDevice(deviceId);
    if (!deletedDevice) {
      return res.status(404).json({ error: 'Device not found' });
    }
    res.status(200).json({ message: 'Device deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete device' });
  }
}



