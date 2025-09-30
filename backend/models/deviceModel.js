// code for interacting with the devices table in the database

const pool = require('../utils/db'); // importing database pool connection

// Get all devices
async function getAllDevices() {
  const result = await pool.query('SELECT * FROM devices;');
  return result.rows;
}

//for all cases the results of the queries are returned as arrays of rows and 
//result.rows is the inserted row data for each function
//creating new device, updating device, deleting device
//returning the inserted row data

// Get a device by ID
// $1 is a placeholder for the deviceId parameter to prevent SQL injection
async function getDeviceById(deviceId) {
  const result = await pool.query('SELECT * FROM devices WHERE device_id = $1;', [deviceId]);
  return result.rows[0];
}


// Create a new device
// same as here $1 and $2 are placeholders for deviceName and location parameters
async function createDevice(deviceName, location) {
  const result = await pool.query(
    'INSERT INTO devices (device_name, location) VALUES ($1, $2) RETURNING *;',
    [deviceName, location]
  );
  return result.rows[0];
}


// Update a device by ID
async function updateDevice(deviceId, deviceName, location) {
  const result = await pool.query(
    'UPDATE devices SET device_name = $1, location = $2 WHERE device_id = $3 RETURNING *;',
    [deviceName, location, deviceId]
  );
  return result.rows[0];
}

// Delete a device by ID
async function deleteDevice(deviceId) {
  const result = await pool.query(
    'DELETE FROM devices WHERE device_id = $1 RETURNING *;',
    [deviceId]
  );
  return result.rows[0];
}

module.exports = {
  getAllDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
};



