const pool = require('../utils/db');

// Get all sensor readings
//Fetches all sensor readings from the database.
//returns {Promise<Array>} Array of sensor reading objects


async function getAllReadings() {
  const result = await pool.query('SELECT * FROM sensor_readings;');
  return result.rows;
}

