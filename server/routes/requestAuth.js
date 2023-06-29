const express = require('express');
const router = express.Router();
const { requestAuth, requestAdminAuth } = require('../controllers/auth.controller');
const { checkIfWaiter } = require('../controllers/cash.register.controller');


router.get('/waiter',
    requestAuth,
    checkIfWaiter
);

router.get('/admin',
    requestAdminAuth,
    (req, res) => {
        res.status(200).end();
    }
)

module.exports = router;