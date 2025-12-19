
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Cart routes
router.post('/cart/add/:productId', orderController.addToCart);
router.get('/cart', orderController.viewCart);
router.get('/cart/update/:productId/:action', orderController.updateCartQuantity);
router.get('/cart/remove/:productId', orderController.removeFromCart);

// Order routes
router.get('/order/preview', orderController.orderPreview);
router.post('/order/confirm', orderController.confirmOrder);
router.get('/order/success/:orderId', orderController.orderSuccess);

module.exports = router;
