const express = require('express');
const router = express.Router();

const { requestAdminAuth } = require('../controllers/auth.controller');
const {
    getUsers,
    addWaiter,
    deleteWaiter } = require('../controllers/waiters.controller');


router.get('/',
    requestAdminAuth,
    getUsers
);

router.post('/',
    requestAdminAuth,
    addWaiter
)

router.delete('/:ID(\\d+)',
    requestAdminAuth,
    deleteWaiter
);


module.exports = router;