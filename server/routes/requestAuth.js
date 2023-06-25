const express = require('express');
const router = express.Router();
const passport = require('passport');
const { requestAuth } = require('../controllers/auth.controller');
router.get('/',
    requestAuth,
    (req, res) => {
        console.log('Autentifikacija prosla');
        res.status(200).end();
    }
);
/*
* token verification failed
* uljepsati malo ovaj print, kada korisnik zeli da
* pristupi ruti a nije ulogovan*/
module.exports = router;