// testing to see if the database connection is working
const pool = require('./utils/db');

async function testConnection() {
  try {
    // Test getting all devices from devices table
    const res = await pool.query('SELECT * FROM sensor_readings;');
    console.log('Sensor_Readings:', res.rows);
  } catch (err) {
    console.error('Error querying database:', err);
  } finally {
    await pool.end(); // close connection pool
  }
}

testConnection();
