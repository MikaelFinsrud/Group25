// server/routes/authentication.js
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const pool = require(path.join(__dirname, '..', 'database.js'));
const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    creds = req.body;

    if (creds.username && creds.password && creds.email){
      conn = await pool.getConnection();
      // we store only the hashed password in our db for security reasons
      hashedPassword = await bcrypt.hash(creds.password, 10);
      
      try {
        result = await conn.query(
          "INSERT INTO users (username, password, email, firstname, lastname, address, phonenumber) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [creds.username, hashedPassword, creds.email, creds.firstName, creds.lastName, creds.address, creds.phone]
        );

        const message = "Account successfully registered";
        res.status(200).json({
          success: true,
          message,
        });
      }
      catch (err){
        err.statusCode = 500;
        if (err.code === 'ER_DUP_ENTRY'){
          err.message = "Failed account registration. Username or email already exists";
          err.statusCode = 400;
          console.error(err.message);
        }

        next(err);
      }
      finally {
        if (conn) conn.release();
      }
    }
    else {
      err = new Error();
      err.message = "Account registration failed: Missing credentials";
      err.statusCode = 400;

      console.error(err.message);
      next(err);
    }
  }
  catch(err) {
    console.error("Something went wrong with account registration: ", err.message);
    err.statusCode = 500;
    next(err);
  }
});

module.exports = router;
