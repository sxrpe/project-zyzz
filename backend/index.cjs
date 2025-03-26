const express = require('express');
const cors = require('cors');
const db = require('./db.cjs');  // Nota l'estensione .cjs

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


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

// Route per il form di contatto (con salvataggio su DB)
app.post('/api/contact', async (req, res) => {
    const { name, email, message } = req.body;

    // Validazione
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: 'Tutti i campi sono obbligatori'
        });
    }

    try {
        // Salva nel database
        const result = await db.query(
            'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING *',
            [name, email, message]
        );

        // Risposta di successo
        res.json({
            success: true,
            data: result.rows[0],
            message: 'Messaggio ricevuto e salvato nel DB!'
        });
    } catch (err) {
        console.error('Errore salvataggio DB:', err);
        res.status(500).json({
            success: false,
            error: 'Errore nel salvataggio del messaggio'
        });
    }
});

// Avvio server
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});