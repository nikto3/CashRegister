const express = require('express');
const router = express.Router();
const { requestAuth } = require('../controllers/auth.controller');
const { reportIsPrinted ,addReport } = require('../controllers/report.controller');

router.get('/',
    requestAuth,
    reportIsPrinted
);

router.post('/:waiterID',
    requestAuth,
    addReport
)


module.exports = router;