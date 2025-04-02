const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const mainRoutes = require('./routes/main');

// Serve frontend
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use('/api', mainRoutes);

app.get('/*any', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Global error-handling middleware
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({
    success: false,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
