const sensorReadingModel = require('../models/sensor_readingModel');

// Get all sensor readings
async function getAllReadings(req, res) {
  try {
    const readings = await sensorReadingModel.getAllReadings();
    res.status(200).json(readings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sensor readings' });
  }
}

//getting sensor readings by device ID
async function getReadingsByDeviceId(req, res) {
  try {
    const deviceId = parseInt(req.params.deviceId);
    const readings = await sensorReadingModel.getReadingsByDeviceId(deviceId);
    res.status(200).json(readings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sensor readings for device' });
  }
}
