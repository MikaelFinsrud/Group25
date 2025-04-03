const mariadb = require('mariadb');
require('dotenv').config();

const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'electromart_3nf';

// Create database pool (not a connection, a pool of connections)
const pool = mariadb.createPool({
    host: 'localhost',
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    connectionLimit: 5  // Number of concurrent connections
  });

module.exports = pool;