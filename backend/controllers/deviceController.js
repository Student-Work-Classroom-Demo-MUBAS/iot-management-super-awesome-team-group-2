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
