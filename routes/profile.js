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
    
        res.json(userData);
    } catch (err) {
        console.log("Something went wrong", err);
        res.status(500).send("Server error");
    } finally {
        if (con) con.release();
    }
});

module.exports = router;