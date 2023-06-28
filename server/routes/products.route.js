const express = require('express');
const router = express.Router();

const { deleteProduct, addProduct, updateProduct, getProductsToday } = require('../controllers/product.controller');
const { requestAdminAuth, requestAuth } = require('../controllers/auth.controller');

router.get('/',
    requestAuth,
    getProductsToday
)

router.post('/',
    requestAdminAuth,
    addProduct
);

router.delete('/:ID',
    requestAdminAuth,
    deleteProduct
);

router.put('/',
    requestAdminAuth,
    updateProduct
)

module.exports = router;