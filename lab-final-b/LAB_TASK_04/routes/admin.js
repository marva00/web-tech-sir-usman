
const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// /admin/ => GET
router.get('/dashboard', adminController.getDashboard);

// /admin/products => GET
router.get('/products', adminController.getProducts);
router.get('/orders', adminController.getOrders);
router.post('/orders/update-status/:orderId', adminController.updateOrderStatus);

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/edit-product/:productId => GET
router.get('/edit-product/:productId', adminController.getEditProduct);

// /admin/edit-product => POST
router.post('/edit-product', adminController.postEditProduct);

// /admin/delete-product => POST
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
