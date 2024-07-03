const express = require('express');
const authRoutes = require('./routes/authRoutes');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('register');
});


module.exports = app;
