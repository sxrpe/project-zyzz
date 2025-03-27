const express = require('express');
//Connessione con il router menager
const router = express.Router();
const ContactRepository = require('../repositories/ContactRepository.cjs');
const db = require('../db.cjs');

const repo = new ContactRepository(db);

router.post('/api/contact', async (req, res, next) => {
    console.log('📨 Body ricevuto:', req.body);

    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Campi mancanti' });
    }

    try {
        const newContact = await repo.createContact({ name, email, message });
        res.json({ success: true, data: newContact }); //exrpess interrompe automaticamente il flusso di next()
    } catch (err) {
        next(err);
    }
});

module.exports = router;