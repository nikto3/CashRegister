const express = require('express');
const router = express.Router();
const { requestAuth, requestAdminAuth } = require('../controllers/auth.controller');

const {
    getAppetizers,
    getMainCourses,
    getDesserts, getAlcoholDrinks, getHotDrinks, getJuices
} = require('../controllers/cash.register.controller');
const {
    addAppetizer,
    addMainCourse,
    addDessert

} = require("../controllers/food.controller");

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

router.post('/appetizers',
    requestAdminAuth,
    addAppetizer
);

router.post('/main-courses',
    requestAdminAuth,
    addMainCourse
);

router.post('/desserts',
    requestAdminAuth,
    addDessert
);

module.exports = router;