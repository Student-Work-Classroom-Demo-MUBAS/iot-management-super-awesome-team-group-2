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
