// server/routes/products.js
const express = require('express');
const path = require('path');
const router = express.Router();
const pool = require(path.join(__dirname, '..', 'database.js'));
const utils = require(path.join(__dirname, '..', 'utils.js'));

router.get('/', async (req, res, next) => {
  let conn;

  try {
    conn = await pool.getConnection();

    const categories = await conn.query("SELECT * FROM categories");
    const products = await conn.query("SELECT * FROM products");

    const message = "Products and categories successfully fetched";

    return res.status(200).json({
      success: true,
      message,
      categories,
      products
    })
  }
  catch(err) {
    console.error("Something went wrong with fetching products: ", err.message);
    err.statusCode = 500;
    return next(err);
  }
  finally {
    if (conn) conn.release();
  }
});

module.exports = router;
