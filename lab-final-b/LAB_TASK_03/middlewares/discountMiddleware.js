
const applyDiscount = (req, res, next) => {
    // Get coupon code from query or body
    const coupon = req.query.coupon || req.body.coupon;

    // Initialize discount info in request object
    req.discount = {
        applied: false,
        code: '',
        discountAmount: 0,
        discountPercentage: 0,
        originalTotal: 0,
        discountedTotal: 0
    };

    const cart = req.session.cart || [];
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    req.discount.originalTotal = total;
    req.discount.discountedTotal = total;

    if (coupon === 'SAVE10') {
        const discountPercentage = 10;
        const discountAmount = total * (discountPercentage / 100);

        req.discount.applied = true;
        req.discount.code = 'SAVE10';
        req.discount.discountPercentage = discountPercentage;
        req.discount.discountAmount = discountAmount;
        req.discount.discountedTotal = total - discountAmount;
    }

    next();
};

module.exports = { applyDiscount };
