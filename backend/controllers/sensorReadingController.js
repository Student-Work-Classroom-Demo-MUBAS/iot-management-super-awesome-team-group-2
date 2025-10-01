const sensorReadingModel = require('../models/sensorReadingModel');

// Controller function to create a new sensor reading
async function createReading(req, res) {
  try {
    const { device_id, temperature, humidity, soil_moisture } = req.body;
    const timestamp = Date.now(); // current timestamp in ms

    // Call model to insert new reading
    const newReading = await sensorReadingModel.createReading(device_id, temperature, humidity, soil_moisture, timestamp);

    res.status(201).json(newReading); // Respond with the new reading data
  } catch (err) {
    res.status(500).json({ error: 'Failed to save sensor reading' });
  }
}

module.exports = {
  createReading,
};
