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
router.get('/', (req, res, next) => {
  const cart = utils.getShoppingCart(req.session.user.userID, next);
  
  res.status(200).json({
    success: true,
    message: 'Handlekurven ble hentet',
    cart
  });
});

/**
 * Legg til et produkt i handlekurven.
 * Route: POST /api/cart
 * Forventet body: { productId: number, quantity: number }
 */
router.post('/', async (req, res, next) => {
  const { productId, quantity } = req.body;
  
  if (!productId || !quantity || quantity < 1) {
    return next(utils.createError("Ugyldig produkt eller antall", 400));
  }
  
  let conn;
  
  try {
    conn = await pool.getConnection();
    
    // Sjekk om produktet faktisk finnes i databasen
    const productRows = await conn.query("SELECT * FROM Products WHERE ProductID = ?", [productId]);
    if (productRows.length === 0) {
      return next(utils.createError("Produktet ble ikke funnet", 404));
    }
    const product = productRows[0];

    let cart = utils.getShoppingCart(req.session.user.userID, next);

    // Sjekk om produktet allerede er i handlekurven og oppdater antallet
    const existingItem = cart.find(item => item.ProductId === productId);
    if (existingItem) {
      utils.changeItemQuantity(product, existingItem.quantity + quantity, req.session.user.userID, next);
    } else {
      utils.addItemToCart(product, quantity, req.session.user.userID. next);
    }

    cart = utils.getShoppingCart(req.session.user.userID, next);
    
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
 * Forventet body: { quantity: number }
 */
router.patch('/:productId', (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  let cart = utils.getShoppingCart(req.session.user.userID, next);
  
  if (quantity == null || quantity < 0) {
    return next(utils.createError("Ugyldig mengde", 400));
  }
  
  if (!cart) {
    return next(utils.createError("Handlekurven er tom", 404));
  }
  
  const index = cart.findIndex(item => item.ProductId == productId);
  if (index === -1) {
    return next(utils.createError("Produktet finnes ikke i handlekurven", 404));
  }
  
  // Dersom mengden settes til 0, fjern produktet fra handlekurven
  if (quantity === 0) {
    utils.removeItem(cart[index], req.session.user.userID, next);
  } else {
    utils.changeItemQuantity(cart[index], quantity, req.session.user.userID, next);
  }

  cart = utils.getShoppingCart(req.session.user.userID, next);
  
  res.status(200).json({
    success: true,
    message: "Handlekurven ble oppdatert",
    cart
  });
});

/**
 * Fjern et produkt fra handlekurven.
 * Route: DELETE /api/cart/:productId
 */
router.delete('/:productId', (req, res, next) => {
  const { productId } = req.params;
  let cart = utils.getShoppingCart(req.session.user.userID, next);

  if (!cart) {
    return next(utils.createError("Handlekurven er tom", 404));
  }

  const index = cart.findIndex(item => item.ProductId == productId);
  if (index === -1) {
    return next(utils.createError("Produktet finnes ikke i handlekurven", 404));
  }

  utils.removeItem(cart[index], req.session.user.userID, next);
  
  cart = utils.getShoppingCart(req.session.user.userID, next);
  
  res.status(200).json({
    success: true,
    message: "Produktet er fjernet fra handlekurven",
    cart
  });
});

module.exports = router;
