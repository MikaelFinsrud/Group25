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
  // Dersom en handlekurv ikke finnes på session, returneres en tom array.
  const cart = req.session.cart || [];
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

    // Initialiser handlekurven i session om den ikke allerede finnes
    if (!req.session.cart) req.session.cart = [];

    // Sjekk om produktet allerede er i handlekurven og oppdater antallet
    const existingItem = req.session.cart.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      req.session.cart.push({ productId, quantity, product });
    }
    
    res.status(200).json({
      success: true,
      message: "Produkt lagt til i handlekurven",
      cart: req.session.cart
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
  
  if (quantity == null || quantity < 0) {
    return next(utils.createError("Ugyldig mengde", 400));
  }
  
  if (!req.session.cart) {
    return next(utils.createError("Handlekurven er tom", 404));
  }
  
  const index = req.session.cart.findIndex(item => item.productId == productId);
  if (index === -1) {
    return next(utils.createError("Produktet finnes ikke i handlekurven", 404));
  }
  
  // Dersom mengden settes til 0, fjern produktet fra handlekurven
  if (quantity === 0) {
    req.session.cart.splice(index, 1);
  } else {
    req.session.cart[index].quantity = quantity;
  }
  
  res.status(200).json({
    success: true,
    message: "Handlekurven ble oppdatert",
    cart: req.session.cart
  });
});

/**
 * Fjern et produkt fra handlekurven.
 * Route: DELETE /api/cart/:productId
 */
router.delete('/:productId', (req, res, next) => {
  const { productId } = req.params;
  if (!req.session.cart) {
    return next(utils.createError("Handlekurven er tom", 404));
  }
  
  req.session.cart = req.session.cart.filter(item => item.productId != productId);
  
  res.status(200).json({
    success: true,
    message: "Produktet er fjernet fra handlekurven",
    cart: req.session.cart
  });
});

module.exports = router;
