const express = require('express');
const router = express.Router();
const { requestAuth, requestAdminAuth } = require('../controllers/auth.controller');

const {
    getAppetizers,
    getMainCourses,
    getDesserts, getAlcoholDrinks, getHotDrinks, getJuices
} = require('../controllers/cash.register.controller');

router.get('/appetizers',
    requestAuth,
    getAppetizers
);

router.get('/main-courses',
    requestAuth,
    getMainCourses
);
router.get('/desserts',
    requestAuth,
    getDesserts
);

module.exports = router;