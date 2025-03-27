//----------RESOURCES & REQUIRE
//Base Backend
const express = require('express');
const cors = require('cors');

//----------CONF BASE BACKEND
//Conf Base Backend Express
const app = express();
app.use(cors());//Accettare richieste da piu' socket
app.use(express.json()); //Parsing in json del corpo delle richieste https

//----------DATABASE

//Credentials




//----------ROUTE API
//Request → Logging Middlewares → JSON Parser → Route Handler → Error Handler(next(err))
const Backend_port = 3001;
const testRoutes = require('./routes/testRoute.cjs');
const contactRoutes = require('./routes/contactRoute.cjs');


//Controllo Backend
/*
app.get('/', (req, res) => {
    res.send('Backend funzionante! Visita /api/test per verificare il DB');
});

//Route API esistente
app.get('/api', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});
*/


//----------MIDDLEWARE
// Middleware per /api/*
app.use('/api', (req, res, next) => {
    console.log(`📡 API Request: ${req.method} ${req.originalUrl}`);
    next();
});

// Middleware per /auth/*
app.use('/auth', (req, res, next) => {
    console.log(`🔐 Auth Request: IP ${req.ip} tried ${req.path}`);
    next();
});
// Middleware per il parsing del JSON
app.use(express.json());


//----------ROUTES
app.use(testRoutes);
app.use(contactRoutes);
/*Se il metodo (get/post) nonc ombacia viene generato un'errore 404 */


//----------ERROR-HANDLER

//Attivazione: Solo se un middleware precedente chiama next(err).
//Avviso al Frontend
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint non trovato' });
    console.log("   ❌  Endpoint non trovato");
});

app.use((err, req, res,next ) => {
    console.error('💥 Errore:', err);
    res.status(500).json({
        error: 'Errore interno del server',
        ...(process.env.NODE_ENV === 'development' && { details: err.message })
    });
});



// Avvio server
app.listen(Backend_port, () => {
    console.log(`Backend in ascolto su http://localhost:${Backend_port}`);
});