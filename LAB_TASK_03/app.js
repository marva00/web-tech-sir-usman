
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const mainRoutes = require('./routes/index');
app.use('/', mainRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
 