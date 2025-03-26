const { Pool } = require('pg');
require('dotenv').config(); // Carica le variabili da .env

const pool = new Pool({
    user: 'myuser',
    host: 'localhost',
    database: 'myappdb',
    password: 'mypass',
    port: 5432
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};;