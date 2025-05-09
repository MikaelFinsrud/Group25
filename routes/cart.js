// server/routes/cart.js
const express = require('express');
const router = express.Router();
const pool = require('../database.js');
const utils = require('../utils.js');
const requireAuth = require('../middleware/requireAuth');

// Sørg for at kun autentiserte brukere får tilgang til handlekurven
router.use(requireAuth);

/**
 * Hent handlekurven for den autentiserte brukeren.
 * Route: GET /api/cart
 */
router.get('/', async (req, res, next) => {
  let conn;
  try {
    conn = await pool.getConnection();

    const username = req.session.user && req.session.user.username;
    if (!username) return next(utils.createError("User not authenticated", 401));

    const userRows = await conn.query('SELECT UserID FROM Users WHERE Username = ?', [username]);
    if (userRows.length === 0) return next(utils.createError("User not found", 404));
    const userID = userRows[0].UserID;

    const cart = await utils.getShoppingCart(userID, next);

    res.status(200).json({
      success: true,
      message: 'Handlekurven ble hentet',
      cart: Array.isArray(cart) ? cart : [],
    });
  } catch (err) {
    err.statusCode = 500;
    return next(err);
  } finally {
    if (conn) conn.release();
  }
});

/**
 * Legg til et produkt i handlekurven.
 * Route: POST /api/cart
 */
router.post('/', async (req, res, next) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity || quantity < 1) {
    return next(utils.createError("Ugyldig produkt eller antall", 400));
  }

  let conn;
  try {
    conn = await pool.getConnection();

    const username = req.session.user && req.session.user.username;
    if (!username) return next(utils.createError("User not authenticated", 401));

    const userRows = await conn.query('SELECT UserID FROM Users WHERE Username = ?', [username]);
    if (userRows.length === 0) return next(utils.createError("User not found", 404));
    const userID = userRows[0].UserID;

    const productRows = await conn.query("SELECT * FROM Products WHERE ProductID = ?", [productId]);
    if (productRows.length === 0) {
      return next(utils.createError("Produktet ble ikke funnet", 404));
    }
    const product = productRows[0];

    let cart = await utils.getShoppingCart(userID, next);
    const existingItem = Array.isArray(cart) ? cart.find(item => item.ProductId === productId) : null;

    if (existingItem) {
      await utils.changeItemQuantity(product, existingItem.Quantity + quantity, userID, next);
    } else {
      await utils.addItemToCart(product, quantity, userID, next);
    }

    cart = await utils.getShoppingCart(userID, next);

    res.status(200).json({
      success: true,
      message: "Produkt lagt til i handlekurven",
      cart
    });
  } catch (err) {
    err.statusCode = 500;
    return next(err);
  } finally {
    if (conn) conn.release();
  }
});

/**
 * Oppdater antall for et spesifikt produkt i handlekurven.
 * Route: PATCH /api/cart/:productId
 */
router.patch('/:productId', async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  let conn;
  try {
    conn = await pool.getConnection();

    const username = req.session.user && req.session.user.username;
    if (!username) return next(utils.createError("User not authenticated", 401));

    const userRows = await conn.query('SELECT UserID FROM Users WHERE Username = ?', [username]);
    if (userRows.length === 0) return next(utils.createError("User not found", 404));
    const userID = userRows[0].UserID;

    const cart = await utils.getShoppingCart(userID, next);

    if (quantity == null || quantity < 0) {
      return next(utils.createError("Ugyldig mengde", 400));
    }

    const index = cart.findIndex(item => item.ProductID == productId);
    if (index === -1) {
      return next(utils.createError("Produktet finnes ikke i handlekurven", 404));
    }

    if (quantity === 0) {
      await utils.removeItem(cart[index], userID, next);
    } else {
      await utils.changeItemQuantity(cart[index], quantity, userID, next);
    }

    const updatedCart = await utils.getShoppingCart(userID, next);

    res.status(200).json({
      success: true,
      message: "Handlekurven ble oppdatert",
      cart: updatedCart,
    });
  } catch (err) {
    err.statusCode = 500;
    return next(err);
  } finally {
    if (conn) conn.release();
  }
});

/**
 * Fjern et produkt fra handlekurven.
 * Route: DELETE /api/cart/:productId
 */
router.delete('/:productId', async (req, res, next) => {
  const { productId } = req.params;

  let conn;
  try {
    conn = await pool.getConnection();

    const username = req.session.user && req.session.user.username;
    if (!username) return next(utils.createError("User not authenticated", 401));

    const userRows = await conn.query('SELECT UserID FROM Users WHERE Username = ?', [username]);
    if (userRows.length === 0) return next(utils.createError("User not found", 404));
    const userID = userRows[0].UserID;

    const cart = await utils.getShoppingCart(userID, next);
    const item = cart.find(item => item.ProductID == productId);

    if (!item) return next(utils.createError("Produktet finnes ikke i handlekurven", 404));

    if (item.Quantity > 1) {
      await utils.changeItemQuantity(item, item.Quantity - 1, userID, next);
    } else {
      await utils.removeItem(productId, userID, next);
    }

    const updatedCart = await utils.getShoppingCart(userID, next);

    res.status(200).json({
      success: true,
      message: "1 stk fjernet fra handlekurven",
      cart: updatedCart,
    });
  } catch (err) {
    err.statusCode = 500;
    return next(err);
  } finally {
    if (conn) conn.release();
  }
});


module.exports = router;
