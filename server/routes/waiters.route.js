const express = require('express');
const router = express.Router();

const { requestAuth, requestAdminAuth } = require('../controllers/auth.controller');
const { getUsers } = require('../controllers/waiters.controller');


router.get('/',
    requestAuth,
    getUsers
    )


module.exports = router;