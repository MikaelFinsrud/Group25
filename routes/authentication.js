// server/routes/authentication.js
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const requireAuth = require('../middleware/requireAuth');
const pool = require(path.join(__dirname, '..', 'database.js'));
const utils = require(path.join(__dirname, '..', 'utils.js'));
const router = express.Router();

router.post('/register', async (req, res, next) => {
  let conn;

  try {
    let creds = req.body;

    if (creds.username && creds.password && creds.email){
      conn = await pool.getConnection();
      // we store only the hashed password in our db for security reasons
      const hashedPassword = await bcrypt.hash(creds.password, 10);
      
      try {
        const result = await conn.query(
          "INSERT INTO users (username, password, email, firstname, lastname, address, phonenumber) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [creds.username, hashedPassword, creds.email, creds.firstName, creds.lastName, creds.address, creds.phone]
        );

        const message = "Account successfully registered";
        return res.status(200).json({
          success: true,
          message,
        });
      }
      catch (err){
        if (err.code === 'ER_DUP_ENTRY'){
          err.message = "Failed account registration. Username or email already exists";
          err.statusCode = 400;
          console.error(err.message);
        }
        return next(err);
      }
    }
    else {
      const err = utils.createError("Account registration failed: Missing credentials", 400);
      return next(err);
    }
  }
  catch(err) {
    console.error("Something went wrong with account registration: ", err.message);
    err.statusCode = 500;
    return next(err);
  }
  finally {
    if (conn) conn.release();
  }
});

router.post('/login', async (req, res, next) => {
  let conn;

  try {
    let creds = req.body;

    if (creds.username && creds.password){
      conn = await pool.getConnection();

      const rows = await conn.query(
        "SELECT * FROM users WHERE username = ?",
        [creds.username]
      );
      const user = rows[0];

      if (user) {
        const valid = await bcrypt.compare(creds.password, user.Password);

        if (valid){
          // Set session
          req.session.user = { username: creds.username, userID: user.UserID };
          const message = "Account successfully logged in";

          return res.status(200).json({
            success: true,
            message,
            user
          });
        }
        else{
          const err = utils.createError("Login failed: Invalid credentials", 400);
          return next(err);
        }
      }
      else{
        const err = utils.createError("Login failed: Invalid credentials", 400);
        return next(err);
      }
    }
    else {
      const err = utils.createError("Login failed: Missing credentials", 400);
      return next(err);
    }
  }
  catch(err) {
    console.error("Something went wrong with login: ", err.message);
    err.statusCode = 500;
    return next(err);
  }
  finally {
    if (conn) conn.release();
  }
});

router.post('/logout', requireAuth, async (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Error destroying session", err);
      err.statusCode = 500;
      err.message = "Could not log out."
      return next(err);
    }

    res.clearCookie('connect.sid'); // Clears the cookie on the client

    const message = 'Successfully logged out of account'
    return res.status(200).json({
      success: true,
      message
    });
  })
});

module.exports = router;
