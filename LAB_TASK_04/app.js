
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

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

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/driving_school')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
const mainRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');

app.use('/', mainRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
