const express = require('express');
const router = express.Router();
const { requestAuth } = require('../controllers/auth.controller');
const { getProductPreviousInfo } = require('../controllers/backups.controller');

router.get('/:productID',
    requestAuth,
    getProductPreviousInfo
);

module.exports = router;