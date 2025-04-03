const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

const authenticationRoutes = require(path.join(__dirname, 'routes', 'authentication'));
const categoriesRoutes = require(path.join(__dirname, 'routes', 'categories'));
const ordersRoutes = require(path.join(__dirname, 'routes', 'orders'));
const productsRoutes = require(path.join(__dirname, 'routes', 'products'));

// Routers
app.use('/api/authentication', authenticationRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);

// Fallback for no API matches
app.use('/api/*',(req, res, next) => {
  const status = 404;
  const message = 'Not found';

  res.status(status).json({
    success: false,
    message,
  });
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

// Serve frontend
app.use(express.static(path.join(__dirname, 'client/dist')));
app.get('/*any', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
