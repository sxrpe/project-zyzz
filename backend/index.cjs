const express = require('express');
const cors = require('cors');
const db = require('./db.cjs');  // Nota l'estensione .cjs

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
//Controllo Connessione derver
const { Pool } = require('pg');

const pool = new Pool({
    user: 'tuo_user',
    host: 'localhost',
    database: 'tuo_db',
    password: 'tua_password',
    port: 5432
});

// Aggiungi questo per debug
pool.on('connect', () => console.log('✅ Connesso al DB'));
pool.on('error', (err) => console.error('❌ Errore DB:', err));

module.exports = {
    query: (text, params) => {
        console.log('📌 Esecuzione query:', text); // Log della query
        return pool.query(text, params);
    }
};



//Controllo Backend
app.get('/', (req, res) => {
    res.send('Backend funzionante! Visita /api/test per verificare il DB');
});

// Route API esistente
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});

// Route di test per il database
app.get('/api/test', async (req, res) => {
    try {
        const result = await db.query('SELECT NOW() as current_time');
        res.json({
            message: 'Connessione al DB riuscita!',
            time: result.rows[0].current_time
        });
    } catch (err) {
        console.error('Errore DB:', err);
        res.status(500).send('Errore del server');
    }
});



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
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});