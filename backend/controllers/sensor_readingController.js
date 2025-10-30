const sensorReadingModel = require('../models/sensor_readingModel');
const pool = require('../utils/db');

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

// controller method to get the latest sensor reading
async function getLatestReading(req, res) {
  try {
    const latestReading = await sensorReadingModel.getLatestReading();
    if (!latestReading) {
      return res.status(404).json({ message: 'No sensor readings found' });
    }
    res.status(200).json(latestReading);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getHourlyReadings(req, res) {
  try {
    const hours = parseInt(req.query.hours) || 3; // get value from query string, fallback 6
    const readings = await sensorReadingModel.getHourlyReadings(hours);
    res.status(200).json(readings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch hourly sensor data' });
  }
}

async function createReading(req, res) {
  try {
    const { device_id, temperature, humidity, soil_moisture, timestamp } = req.body;
    const newReading = await sensorReadingModel.createReading(device_id, temperature, humidity, soil_moisture, timestamp);
    res.status(201).json(newReading);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create sensor reading' });
  }
}

// Delete a sensor reading by ID
async function deleteReading(req, res) {
  try {
    const readingId = parseInt(req.params.readingId);
    const deletedReading = await sensorReadingModel.deleteReading(readingId);
    if (!deletedReading) {
      return res.status(404).json({ error: 'Sensor reading not found' });
    }
    res.status(200).json({ message: 'Sensor reading deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete sensor reading' });
  }
}


module.exports = {
  getAllReadings,
  getReadingsByDeviceId,
  getLatestReading,
  getHourlyReadings,
  createReading,
  deleteReading,
};