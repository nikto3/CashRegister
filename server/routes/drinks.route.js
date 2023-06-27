const express = require("express");
const router = express.Router();
const { requestAuth, requestAdminAuth } = require('../controllers/auth.controller');
const {
    getAlcoholDrinks,
    getHotDrinks,
    getJuices
} = require('../controllers/cash.register.controller');

const {
    addAlcoholDrink,
    addHotDrink,
    addJuice
} = require('../controllers/drinks.controller');

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

router.post(
    '/alcohol',
    requestAdminAuth,
    addAlcoholDrink
);

router.post(
    '/hot',
        requestAdminAuth,
        addHotDrink
);

router.post(
    '/juices',
        requestAdminAuth,
        addJuice
);


module.exports = router;