
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { page: 'home' });
});

router.get('/checkout', (req, res) => {
    res.render('checkout', { page: 'checkout' });
});

module.exports = router;
