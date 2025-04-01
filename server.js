const express = require('express');
const path = require('path');
require('dotenv').config();  //Loads the values from .env into process.env

const app = express();
const PORT = process.env.PORT;

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine or static HTML
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile); // Optional: This lets us write plain HTML but still use EJS template syntax
app.set('view engine', 'html');

// Routes
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
