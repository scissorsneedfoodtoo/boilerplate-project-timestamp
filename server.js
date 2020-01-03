require('dotenv').config();

// Initiate project
const express = require('express');
const app = express();

app.use('/public', express.static(process.cwd() + '/public'));

app.route('/')
  .get((req, res) => {
    res.sendFile(process.cwd() + '/views/index.html');
  });

// Your first API endpoint
app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'Hello API' });
});

const portNum = process.env.PORT || 3000;

// Listen for requests
app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`);
});

module.exports = app; // For testing
