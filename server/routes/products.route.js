const express = require('express');
const router = express.Router();

const { deleteProduct, addProduct, updateProduct } = require('../controllers/product.controller');
const { requestAdminAuth } = require('../controllers/auth.controller');

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