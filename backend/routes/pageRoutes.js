const express = require('express');
const router = express.Router();

// Render the chart page
router.get('/charts', (req, res) => {
  res.render('/charts'); // pages/charts.ejs
});

module.exports = router;
