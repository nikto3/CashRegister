const express = require('express');
const router = express.Router();
const passport = require('../passport/passport');
const { getAlcoholDrinks,
        getHotDrinks,
        getJuices,
        getAppetizers,
        getMainCourses,
        getDesserts} = require('../controllers/cash.register.controller');

router.get('/',
    (req, res, next) => {
        console.log('Stigao zahtjev na /cash-register rutu');
        next();
    },
    passport.authenticate('jwt', {session: false, failureRedirect: '/'}),
    //getAlcoholDrinks
    (req, res) => {
    res.status(200).json({message: 'Welcome to cash-register route'})
    }
);


module.exports = router;

