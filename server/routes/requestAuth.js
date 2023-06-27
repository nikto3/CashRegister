const express = require('express');
const router = express.Router();
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

// TODO - dodati poruku unutar catch bloka
//  kada ne uspije verifikacija tokena
module.exports = router;