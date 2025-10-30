//Importing modules
const express = require('express');
const router = express.Router();

const pool = require('../utils/db');

// Rendering dashboard page
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM sensor_readings ORDER BY timestamp DESC LIMIT 20;'
    );
    res.render('dashboard', { readings: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading dashboard');
  }
});

module.exports = router;
