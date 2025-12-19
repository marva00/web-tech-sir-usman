
const Product = require('../models/Product');
const Order = require('../models/Order');

// Add product to cart (session-based)
exports.addToCart = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.redirect('/?error=Product not found');
        }

        // Initialize cart if not exists
        if (!req.session.cart) {
            req.session.cart = [];
        }

        // Check if product already in cart
        const existingItem = req.session.cart.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            req.session.cart.push({
                productId: product._id.toString(),
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        res.redirect('/cart');
    } catch (err) {
        console.error('Add to cart error:', err);
        res.redirect('/?error=Failed to add to cart');
    }
};

// View cart
exports.viewCart = (req, res) => {
    const cart = req.session.cart || [];
    const grandTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.render('cart', {
        page: 'cart',
        cart: cart,
        grandTotal: grandTotal
    });
};

// Order preview page
exports.orderPreview = (req, res) => {
    const cart = req.session.cart || [];

    if (cart.length === 0) {
        return res.redirect('/cart');
    }

    const grandTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.render('order-preview', {
        page: 'order-preview',
        cart: cart,
        grandTotal: grandTotal
    });
};

// Confirm order - save to MongoDB
exports.confirmOrder = async (req, res) => {
    try {
        const cart = req.session.cart || [];

        if (cart.length === 0) {
            return res.redirect('/cart');
        }

        const grandTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Create order in MongoDB
        const order = new Order({
            items: cart.map(item => ({
                productId: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            grandTotal: grandTotal,
            status: 'Placed'
        });

        await order.save();

        // Clear cart session
        req.session.cart = [];

        // Redirect to success page
        res.redirect(`/order/success/${order._id}`);
    } catch (err) {
        console.error('Confirm order error:', err);
        res.redirect('/order/preview?error=Failed to place order');
    }
};

// Order success page
exports.orderSuccess = async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);

        if (!order) {
            return res.redirect('/?error=Order not found');
        }

        res.render('order-success', {
            page: 'order-success',
            order: order
        });
    } catch (err) {
        console.error('Order success error:', err);
        res.redirect('/');
    }
};

// Update cart quantity
exports.updateCartQuantity = (req, res) => {
    const { productId, action } = req.params;
    const cart = req.session.cart || [];

    const item = cart.find(item => item.productId === productId);

    if (item) {
        if (action === 'increase') {
            item.quantity += 1;
        } else if (action === 'decrease') {
            item.quantity -= 1;
            if (item.quantity <= 0) {
                req.session.cart = cart.filter(i => i.productId !== productId);
            }
        }
    }

    res.redirect('/cart');
};

// Remove item from cart
exports.removeFromCart = (req, res) => {
    const { productId } = req.params;
    req.session.cart = (req.session.cart || []).filter(item => item.productId !== productId);
    res.redirect('/cart');
};
