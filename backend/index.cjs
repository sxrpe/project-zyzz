//----------RESOURCES & REQUIRE
//Base Backend
const express = require('express');
const cors = require('cors');
//Variabili d'Ambiente
require('dotenv').config();




//----------CONF BASE BACKEND
//Conf Base Backend Express
const app = express();
app.use(cors());//Accettare richieste da piu' socket
app.use(express.json()); //Parsing in json del corpo delle richieste https

//----------DATABASE

//Credentials
const db = require('./db.cjs');

// Debug
const checkConnection = async () => {
    try {
        const client = await db.connect();
        console.log('✅ Connessione stabilita');
        client.release(); // Rilascia la connessione
    } catch (err) {
        console.error('❌ Errore di connessione:', err);
    }
};

checkConnection();

// Eventi di errore
db.on('error', (err) => console.error('❌ Errore DB:', err));

process.on('SIGINT', async () => {
    console.log('🔌 Chiudendo il pool...');
    await db.end();
    process.exit(0);
});


//----------ROUTE API
const Backend_port = 3001;
//Controllo Backend
app.get('/', (req, res) => {
    res.send('Backend funzionante! Visita /api/test per verificare il DB');
});

//Route API esistente
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});

//Route : /api/test (Test Connessione DB)
app.get('/api/test', async (req, res) => {
    try {

        await db.query("SET timezone = 'Europe/Rome';");
        const result = await db.query('SELECT NOW() as current_time;');
        console.log('Ora corretta:', result.rows[0].current_time);
        res.json({
            message: 'Connessione al DB riuscita!',
            time: result.rows[0].current_time
        });
    } catch (err) {
        console.error('Errore DB:', err);
        res.status(500).send('Errore del server');
    }
});


//Route : /api/contact
app.post('/api/contact', async (req, res) => {
    console.log('📨 Body ricevuto:', req.body); // Log del payload

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        console.log('❌ Validazione fallita');
        return res.status(400).json({ error: 'Campi mancanti' });
    }

    try {
        const queryText = 'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *';
        console.log('🔍 Query:', queryText, [name, email, message]);

        const result = await db.query(queryText, [name, email, message]);
        console.log('💾 Risultato DB:', result.rows);

        res.json({ success: true, data: result.rows[0] });
    } catch (err) {
        console.error('🔥 Errore grave:', err);
        res.status(500).json({ error: 'Errore DB', details: err.message });
    }
});


// Avvio server
app.listen(Backend_port, () => {
    console.log(`Backend in ascolto su http://localhost:${Backend_port}`);
});