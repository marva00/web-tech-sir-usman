const Product = require('../models/Product');
const Order = require('../models/Order');

// GET /admin/orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.render('admin/orders', {
            page: 'admin-orders',
            orders: orders
        });
    } catch (err) {
        console.error("Admin Orders Error:", err);
        res.redirect('/admin/dashboard?error=Failed to fetch orders');
    }
};

// POST /admin/orders/update-status/:orderId
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { newStatus } = req.body;

        const order = await Order.findById(orderId);
        if (!order) return res.redirect('/admin/orders?error=Order not found');

        const statusSequence = ['Placed', 'Processing', 'Delivered'];
        const currentIdx = statusSequence.indexOf(order.status);
        const nextIdx = statusSequence.indexOf(newStatus);

        // Logic: Cannot skip states, and must be moving forward
        if (nextIdx !== currentIdx + 1) {
            return res.redirect('/admin/orders?error=Invalid transition');
        }

        order.status = newStatus;
        await order.save();

        res.redirect('/admin/orders');
    } catch (err) {
        console.error("Update Status Error:", err);
        res.redirect('/admin/orders?error=Failed to update status');
    }
};

// GET /admin/dashboard
exports.getDashboard = async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        res.render('admin/dashboard', {
            pageTitle: 'Admin Dashboard',
            path: '/admin',
            productCount: productCount,
            layout: 'layouts/admin-layout'
        });
    } catch (err) {
        console.log(err);
    }
};

// GET /admin/products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('admin/products', {
            products: products,
            pageTitle: 'Admin Products',
            path: '/admin/products',
            layout: 'layouts/admin-layout'
        });
    } catch (err) {
        console.log(err);
    }
};

// GET /admin/add-product
exports.getAddProduct = (req, res) => {
    res.render('admin/product-form', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        layout: 'layouts/admin-layout' // Explicitly use admin layout
    });
};

// POST /admin/add-product
exports.postAddProduct = async (req, res) => {
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;
    // For simplicity, assuming image URL is passed string or we can add file upload later. 
    // Lab tasks usually accept URL string first.
    const image = req.body.image;

    const product = new Product({
        name: name,
        price: price,
        description: description,
        category: category,
        image: image
    });

    try {
        await product.save();
        console.log('Created Product');
        res.redirect('/admin/products');
    } catch (err) {
        console.log(err);
    }
};

// GET /admin/edit-product/:productId
exports.getEditProduct = async (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    try {
        const product = await Product.findById(prodId);
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/product-form', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product,
            layout: 'layouts/admin-layout'
        });
    } catch (err) {
        console.log(err);
    }
};

// POST /admin/edit-product
exports.postEditProduct = async (req, res) => {
    const prodId = req.body.productId;
    const updatedName = req.body.name;
    const updatedPrice = req.body.price;
    const updatedImage = req.body.image;
    const updatedDesc = req.body.description;
    const updatedCategory = req.body.category;

    try {
        const product = await Product.findById(prodId);
        product.name = updatedName;
        product.price = updatedPrice;
        product.description = updatedDesc;
        product.image = updatedImage;
        product.category = updatedCategory;

        await product.save();
        console.log('UPDATED PRODUCT!');
        res.redirect('/admin/products');
    } catch (err) {
        console.log(err);
    }
};

// POST /admin/delete-product
exports.postDeleteProduct = async (req, res) => {
    const prodId = req.body.productId;
    try {
        await Product.findByIdAndDelete(prodId);
        console.log('DESTROYED PRODUCT');
        res.redirect('/admin/products');
    } catch (err) {
        console.log(err);
    }
};
