const express = require('express');
const router = express.Router();

const { deleteProduct } = require('../controllers/product.controller');
const { requestAdminAuth } = require('../controllers/auth.controller');

router.delete('/:ID',
    requestAdminAuth,
    deleteProduct
);

module.exports = router;