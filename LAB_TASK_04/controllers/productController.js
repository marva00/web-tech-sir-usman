
const Product = require('../models/Product');

exports.getHomePage = async (req, res) => {
    try {
        // Filtering
        let query = {};
        if (req.query.category && req.query.category !== 'All') {
            query.category = req.query.category;
        }
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
            if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
        }

        // Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4; // Default to 4 items (one row)
        const skip = (page - 1) * limit;

        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query)
            .skip(skip)
            .limit(limit);

        const totalPages = Math.ceil(totalProducts / limit);

        res.render('index', {
            page: 'home',
            products: products,
            currentPage: page,
            totalPages: totalPages,
            filters: {
                category: req.query.category || 'All',
                minPrice: req.query.minPrice || '',
                maxPrice: req.query.maxPrice || ''
            }
        });
    } catch (err) {
        console.error("Controller Error:", err);
        // Render index with error message
        res.render('index', {
            page: 'home',
            products: [],
            currentPage: 1,
            totalPages: 1,
            filters: {
                category: 'All',
                minPrice: '',
                maxPrice: ''
            },
            error: "Database Error: " + err.message + ". Please ensure MongoDB is running."
        });
    }
};

exports.getCheckoutPage = (req, res) => {
    res.render('checkout', { page: 'checkout' });
};
