const express = require('express');
const router = express.Router();
const { requestAuth } = require('../controllers/auth.controller');

router.get('/',
    (req, res, next) => {
        console.log('Stigao zahtjev na /cash-register rutu');
        next();
    },
    requestAuth
);


module.exports = router;

