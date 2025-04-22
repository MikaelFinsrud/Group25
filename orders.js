// server/routes/orders.js
const express = require('express');
const router = express.Router();
const pool = require('../database.js');
const utils = require('../utils.js');
const requireAuth = require('../middleware/requireAuth');

/**
 * GET /api/orders/shoppingcart
 * Hent handlekurven fra session
 */
router.get('/shoppingcart', requireAuth, (req, res, next) => {
  const cart = req.session.cart || [];
  return res.status(200).json({
    success: true,
    message: 'Handlekurven ble hentet.',
    cart
  });
});

/**
 * GET /api/orders/orderlist
 * Hent alle ordre for den innloggede brukeren
 */
router.get('/orderlist', requireAuth, async (req, res, next) => {
  let conn;
  try {
    const username = req.session.user && req.session.user.username;
    if (!username) {
      return next(utils.createError('Bruker ikke autentisert', 401));
    }

    conn = await pool.getConnection();
    // Finn brukerens ID
    const userRows = await conn.query(
      'SELECT UserID FROM Users WHERE Username = ?',
      [username]
    );
    if (userRows.length === 0) {
      return next(utils.createError('Bruker ikke funnet', 404));
    }
    const userID = userRows[0].UserID;

    // Hent ordre
    const orders = await conn.query(
      'SELECT OrderID, OrderDate, Status, TotalAmount FROM Orders WHERE UserID = ? ORDER BY OrderDate DESC',
      [userID]
    );

    return res.status(200).json({
      success: true,
      message: 'Ordrelisten ble hentet.',
      orders
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    return next(err);
  } finally {
    if (conn) conn.release();
  }
});

/**
 * PUT /api/orders/checkout
 * Lag en ordre fra handlekurven, opprett OrderItems, oppdater lager og opprett betalingspost
 */
router.put('/checkout', requireAuth, async (req, res, next) => {
  let conn;
  try {
    // 1) Hent handlekurv
    const cart = req.session.cart;
    if (!cart || cart.length === 0) {
      return next(utils.createError('Handlekurven er tom', 400));
    }

    // 2) Finn UserID
    const username = req.session.user && req.session.user.username;
    if (!username) {
      return next(utils.createError('Bruker ikke autentisert', 401));
    }

    conn = await pool.getConnection();
    await conn.beginTransaction();

    const userRows = await conn.query(
      'SELECT UserID FROM Users WHERE Username = ?',
      [username]
    );
    if (userRows.length === 0) {
      return next(utils.createError('Bruker ikke funnet', 404));
    }
    const userID = userRows[0].UserID;

    // 3) Sjekk lager og beregn totalbeløp
    let totalAmount = 0;
    for (const item of cart) {
      const [product] = await conn.query(
        'SELECT Price, StockQuantity, Name FROM Products WHERE ProductID = ?',
        [item.productId]
      );
      if (!product) {
        throw utils.createError(`Produkt med ID ${item.productId} finnes ikke`, 404);
      }
      if (product.StockQuantity < item.quantity) {
        throw utils.createError(`Ikke nok lager for produkt ${product.Name}`, 400);
      }
      totalAmount += product.Price * item.quantity;
    }

    // 4) Opprett ordre
    const orderRes = await conn.query(
      'INSERT INTO Orders (UserID, OrderDate, Status, TotalAmount) VALUES (?, NOW(), "Pending", ?)',
      [userID, totalAmount]
    );
    // Konverter BigInt til Number for serialisering
    const orderId = Number(orderRes.insertId);

    // 5) Opprett OrderItems og oppdater lager
    for (const item of cart) {
      const [product] = await conn.query(
        'SELECT Price FROM Products WHERE ProductID = ?',
        [item.productId]
      );
      const subtotal = product.Price * item.quantity;

      await conn.query(
        'INSERT INTO OrderItems (OrderID, ProductID, Quantity, Subtotal) VALUES (?, ?, ?, ?)',
        [orderId, item.productId, item.quantity, subtotal]
      );
      await conn.query(
        'UPDATE Products SET StockQuantity = StockQuantity - ? WHERE ProductID = ?',
        [item.quantity, item.productId]
      );
    }

    // 6) Opprett betalingspost
    await conn.query(
      'INSERT INTO Payments (OrderID, PaymentMethod, Amount, PaymentDate, Status) VALUES (?, ?, ?, NOW(), "Pending")',
      [orderId, req.body.paymentMethod || 'CreditCard', totalAmount]
    );

    await conn.commit();

    // 7) Tøm handlekurv
    req.session.cart = [];

    return res.status(200).json({
      success: true,
      message: 'Checkout fullført, ordren er opprettet.',
      orderId,
      totalAmount
    });
  } catch (err) {
    if (conn) await conn.rollback();
    err.statusCode = err.statusCode || 500;
    return next(err);
  } finally {
    if (conn) conn.release();
  }
});

/**
 * GET /api/orders/history
 * Hent hele ordrehistorikken for den innloggede brukeren, inkl. ordrelinjer og produktdetaljer
 */
router.get('/history', requireAuth, async (req, res, next) => {
  let conn;
  try {
    // 1) Hent brukeren
    const username = req.session.user && req.session.user.username;
    if (!username) {
      return next(utils.createError('Bruker ikke autentisert', 401));
    }

    conn = await pool.getConnection();

    // 2) Finn UserID
    const userRows = await conn.query(
      'SELECT UserID FROM Users WHERE Username = ?',
      [username]
    );
    if (userRows.length === 0) {
      return next(utils.createError('Bruker ikke funnet', 404));
    }
    const userID = userRows[0].UserID;

    // 3) Hent ordre for brukeren
    const orders = await conn.query(
      'SELECT OrderID, OrderDate, Status, TotalAmount FROM Orders WHERE UserID = ? ORDER BY OrderDate DESC',
      [userID]
    );

    // 4) For hver ordre, hent ordrelinjer + produktinfo
    for (const order of orders) {
      const items = await conn.query(
        `SELECT 
           oi.OrderItemID,
           oi.ProductID,
           oi.Quantity,
           oi.Subtotal,
           p.Name      AS ProductName,
           p.Description,
           p.ImageID
         FROM OrderItems oi
         JOIN Products p ON oi.ProductID = p.ProductID
         WHERE oi.OrderID = ?`,
        [order.OrderID]
      );
      order.items = items;
    }

    // 5) Returner samlet historikk
    return res.status(200).json({
      success: true,
      message: 'Ordrehistorikken ble hentet.',
      orders
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    return next(err);
  } finally {
    if (conn) conn.release();
  }
});


module.exports = router;




