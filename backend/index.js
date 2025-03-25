import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());//Permette la richiesta da altri domini quindi il mio frontend che ha una porta diversa
app.use(express.json());

// Route principale per verificare il funzionamento
app.get('/', (req, res) => {
    res.send('Backend funzionante! Visita /api per i dati');
});

// Route API esistente
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});



app.post('/api/contact', (req, res) => {
    // 1. Validazione base
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            error: 'Tutti i campi sono obbligatori'
        });
    }

    // 2. Simulazione invio email/salvataggio nel database
    console.log('Nuovo messaggio di contatto:');
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Messaggio:', message);

    // 3. Risposta al frontend
    res.json({
        success: true,
        message: 'Messaggio ricevuto con successo'
    });
});