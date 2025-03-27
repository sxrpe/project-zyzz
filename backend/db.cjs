//Modulo PostgreSQL
const { Pool } = require('pg');
require('dotenv').config(); // Carica le variabili da .env

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT

});

//Da definire i metodi per incapsulare il Database
/*module.exports = {
    query: (text, params) => pool.query(text, params) // Incapsula l'accesso al pool
};
*/

// Debug
const checkConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('✅ Connessione stabilita');
        client.release(); // Rilascia la connessione
    } catch (err) {
        console.error('❌ Errore di connessione:', err);
    }
};

checkConnection();

// Eventi di errore
pool.on('error', (err) => console.error('❌ Errore DB:', err));

process.on('SIGINT', async () => {
    console.log('🔌 Chiudendo il pool...');
    await pool.end();
    process.exit(0);
});


module.exports = pool;