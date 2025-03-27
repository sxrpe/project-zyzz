const express = require('express');
//Connessione con il router menager
const router = express.Router();
const TestRepository = require('../repositories/TestRepository.cjs');
const db = require('../db.cjs');

const repo = new TestRepository(db);

router.get('/api/test', async (req, res, next) => {

    try {
        const data = await repo.testConnection();
        res.json(data); //exrpess interrompe automaticamente il flusso di next()
    } catch (err) {
        next(err); // Passa all'error handler centrale
    }
});

module.exports = router;