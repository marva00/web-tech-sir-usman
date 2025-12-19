
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { applyDiscount } = require('../middlewares/discountMiddleware');

// Cart routes
router.post('/cart/add/:productId', orderController.addToCart);
router.get('/cart', orderController.viewCart);
router.get('/cart/update/:productId/:action', orderController.updateCartQuantity);
router.get('/cart/remove/:productId', orderController.removeFromCart);

// Order routes
router.get('/order/preview', applyDiscount, orderController.orderPreview);
router.post('/order/confirm', applyDiscount, orderController.confirmOrder);
router.get('/order/success/:orderId', orderController.orderSuccess);
router.get('/my-orders', orderController.getMyOrders);

module.exports = router;
