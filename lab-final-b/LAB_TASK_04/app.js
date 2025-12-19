
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use express-ejs-layouts
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout'); // Default layout

// Body Parser (for form data)
app.use(express.urlencoded({ extended: false }));

// Session middleware (for cart)
app.use(session({
    secret: 'driving-school-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true in production with HTTPS
}));

// Make cart available to all views
app.use((req, res, next) => {
    const cart = req.session.cart || [];
    res.locals.cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    next();
});

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/driving_school')
    .then(() => console.log('Connected to MongoDB - driving_school'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
const mainRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');
const orderRoutes = require('./routes/order');

app.use('/', orderRoutes); // Order routes first for /cart and /order paths
app.use('/admin', adminRoutes);
app.use('/', mainRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
