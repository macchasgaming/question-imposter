const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory object storing game rooms globally
const globalRoomsDatabase = {};

// Serve the index.html file at the base URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Endpoint to fetch current game state
app.post('/api/get', (req, res) => {
  const { key } = req.body;
  const value = globalRoomsDatabase[key] || null;
  res.json({ value });
});

// Endpoint to save or update game state
app.post('/api/set', (req, res) => {
  const { key, value } = req.body;
  globalRoomsDatabase[key] = value;
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server successfully started on port ${PORT}`);
});
