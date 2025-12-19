
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getHomePage);
router.get('/checkout', productController.getCheckoutPage);

module.exports = router;
