const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve the static frontend files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve the 'data' folder
app.use('/data', express.static(path.join(__dirname, 'data')));

// API route to serve JSON data for drones
app.get('/api/drones', (req, res) => {
  try {
    const dronesData = require('./data/amazon data.json');
    res.json(dronesData);
  } catch (error) {
    console.error('Error loading drone data:', error);
    res.status(500).json({ error: 'Failed to load drone data' });
  }
});

// Route to serve the 'drones.html' file when accessed directly
app.get('/drones.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'drones.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
