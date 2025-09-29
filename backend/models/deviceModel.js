// code for interacting with the devices table in the database

const pool = require('../utils/db'); // importing database pool connection

// Get all devices
async function getAllDevices() {
  const result = await pool.query('SELECT * FROM devices;');
  return result.rows;
}

// Get a device by ID
async function getDeviceById(deviceId) {
  const result = await pool.query('SELECT * FROM devices WHERE device_id = $1;', [deviceId]);
  return result.rows[0];
}


// Create a new device
async function createDevice(deviceName, location) {
  const result = await pool.query(
    'INSERT INTO devices (device_name, location) VALUES ($1, $2) RETURNING *;',
    [deviceName, location]
  );
  return result.rows[0];
}

