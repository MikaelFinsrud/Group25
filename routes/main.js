const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index'); // Looks for views/index.html
});

module.exports = router;
