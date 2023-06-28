const express = require('express');
const router = express.Router();
const { requestAuth } = require('../controllers/auth.controller');
const { addBill,
    addBillProduct,
    getBills ,
    updateBillProduct
} = require('../controllers/bill.controller');

router.get('/',
    requestAuth,
    getBills
);

router.post('/:waiterID',
    requestAuth,
    addBill
);

router.post('/products/:billID',
    requestAuth,
    addBillProduct
);

router.put('/products/:reportID',
    requestAuth,
    updateBillProduct
);


module.exports = router;