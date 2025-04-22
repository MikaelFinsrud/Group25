const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const pool = require(path.join(__dirname, 'database.js'));
require('dotenv').config();

// General const values
const PORT = process.env.PORT || 5000;

// Routers
const authenticationRoutes = require(path.join(__dirname, 'routes', 'authentication.js'));
const ordersRoutes = require(path.join(__dirname, 'routes', 'orders.js'));
const productsRoutes = require(path.join(__dirname, 'routes', 'products.js'));
const profileRoutes = require(path.join(__dirname, 'routes', 'profile.js'));
const cartRoutes = require(path.join(__dirname, 'routes', 'cart.js'));

// Converts req.body to a json object
app.use('/api/*any', express.json());

// Allows the server to read cookies sent by the client
app.use(cookieParser());

// Sets the server up manage user sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallbackKey123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true, // Mitigate XSS
  }
}));

// Use routers
app.use('/api/authentication', authenticationRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/cart', cartRoutes);

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