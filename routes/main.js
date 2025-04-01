// server/routes/main.js
const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Laptop', category: 'Computers', price: 1200 },
  { id: 2, name: 'Headphones', category: 'Audio', price: 99 },
  { id: 3, name: 'Monitor', category: 'Computers', price: 220 },
  { id: 4, name: 'Smartphone', category: 'Phones', price: 700 },
];

router.get('/products', (req, res) => {
  res.json(products);
});

module.exports = router;
