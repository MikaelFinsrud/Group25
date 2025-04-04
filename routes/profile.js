const express = require('express');
const pool = require('../database.js');
const requireAuth = require('../middleware/requireAuth.js')
const router = express.Router();


    
router.get('/', requireAuth, async (req, res) => {
    console.log("Authentication request");
    
    let username = req.session.user.username;
    console.log('username from session', username);
    
    let con;
    
    try {
        con = await pool.getConnection();
        const rows = await con.query('SELECT Username,Email,FirstName,LastName,Address,PhoneNumber FROM users WHERE username = ?', [username]);
        const userData = rows[0];
        const message = "Database query sucess";
        
        return res.status(200).json({
            success: true,
            userData,
            message,
        });
    } catch (err) {
        err.message = "Database query failed"
        err.statusCode = 400;
        console.error(err.message);
        return next(err);
    } finally {
        if (con) con.release();
    }
});

module.exports = router;