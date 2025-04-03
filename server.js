const express = require('express');
const path = require('path');
const app = express();
const mariadb = require('mariadb');
require('dotenv').config();

// General const values
const PORT = process.env.PORT || 5000;
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'electromart_3nf';

// Routers
const authenticationRoutes = require(path.join(__dirname, 'routes', 'authentication'));
const categoriesRoutes = require(path.join(__dirname, 'routes', 'categories'));
const ordersRoutes = require(path.join(__dirname, 'routes', 'orders'));
const productsRoutes = require(path.join(__dirname, 'routes', 'products'));

// Converts req.body to a json object
app.use('/api/*any', express.json());

// Use routers
app.use('/api/authentication', authenticationRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);

// Fallback for no API matches
app.use('/api/*any',(req, res, next) => {
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
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.get('/*any', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Create database pool (not a connection, a pool of connections)
const pool = mariadb.createPool({
  host: 'localhost',
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  connectionLimit: 5  // Number of concurrent connections
});

// Start the server
app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);

  console.log("Testing the database connection..");
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM products");
    console.log("Products: ", rows);
  }
  catch {
    console.error("Database connection failed!");
  }
});

module.exports = pool;
