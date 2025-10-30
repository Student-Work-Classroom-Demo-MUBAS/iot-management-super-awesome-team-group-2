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

// Get the latest sensor reading
async function getLatestReading() {
  const result = await pool.query(
    'SELECT device_id, temperature, humidity, soil_moisture, timestamp FROM sensor_readings ORDER BY timestamp DESC LIMIT 1;'
  );
  return result.rows[0];  // return the latest reading
}

// Fetch readings for each past hour (adjust hours as needed)
async function getHourlyReadings(hours = 3) {
  const result = await pool.query(
    `SELECT 
        date_trunc('hour', timestamp) as hour,
        AVG(temperature) as avg_temperature,
        AVG(humidity) as avg_humidity,
        AVG(soil_moisture) as avg_moisture
    FROM sensor_readings
    WHERE timestamp >= NOW() - INTERVAL '${hours} hours'
    GROUP BY hour
    ORDER BY hour ASC;`
    [hours]
  );
  return result.rows;
}


// Create a new sensor reading
// $ are placeholders for parameters
async function createReading(deviceId, temperature, humidity, soilMoisture) {
  const result = await pool.query(
    `INSERT INTO sensor_readings (device_id, temperature, humidity, soil_moisture)
     VALUES ($1, $2, $3, $4) RETURNING *;`,
    [deviceId, temperature, humidity, soilMoisture]
  );
  return result.rows[0];
}

// Delete a reading by ID
async function deleteReading(readingId) {
  const result = await pool.query(
    'DELETE FROM sensor_readings WHERE reading_id = $1 RETURNING *;',
    [readingId]
  );
  return result.rows[0];
}

// Exporting the functions to be used in other parts of the application
module.exports = {
  getAllReadings,
  getReadingsByDeviceId,
  getLatestReading,
  getHourlyReadings,
  createReading,
  deleteReading,
};
