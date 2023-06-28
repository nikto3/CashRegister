const express = require("express");
const router = express.Router();
const { requestAuth } = require('../controllers/auth.controller');
const {
    getAlcoholDrinks,
    getHotDrinks,
    getJuices
} = require('../controllers/cash.register.controller');



router.get('/alcohol',
    requestAuth,
                getAlcoholDrinks
);

router.get('/hot',
    requestAuth,
    getHotDrinks
);
router.get('/juices',
    requestAuth,
    getJuices
);




module.exports = router;