const pool = require('../utils/db');

// Get all sensor readings
//Fetches all sensor readings from the database.
//returns {Promise<Array>} Array of sensor reading objects


async function getAllReadings() {
  const result = await pool.query('SELECT * FROM sensor_readings;');
  return result.rows;
}

// Get readings by device ID
// timestamp for indicating when a reading was taken
// Orders results by timestamp in descending order (most recent first)
async function getReadingsByDeviceId(deviceId) {
  const result = await pool.query(
    'SELECT * FROM sensor_readings WHERE device_id = $1 ORDER BY timestamp DESC;',
    [deviceId]
  );
  return result.rows;
}

// Create a new sensor reading
// $ are placeholders for parameters
async function createReading(deviceId, temperature, humidity, soilMoisture, timestamp) {
  const result = await pool.query(
    `INSERT INTO sensor_readings (device_id, temperature, humidity, soil_moisture, timestamp)
     VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
    [deviceId, temperature, humidity, soilMoisture, timestamp]
  );
  return result.rows[0];
}

