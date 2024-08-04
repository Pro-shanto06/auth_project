const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateAuthToken = require('../utils/authToken');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).render('register', { errors: ['User already exists'] });
        }

        user = new User({ username, email, password });
        await user.save();

        res.status(201).render('login', { successMessage: 'Registration successful. Please log in.' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).render('register', { errors });
        } else {
            console.error(error);
            return res.status(500).render('register', { errorMessage: 'Server error. Please try again later.' });
        }
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).render('login', { errorMessage: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).render('login', { errorMessage: 'Invalid credentials' });
        }

        const token = generateAuthToken(user._id);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/auth/profile');
    } catch (error) {
        console.error(error);
        return res.status(500).render('login', { errorMessage: 'Server error. Please try again later.' });
    }
};

const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).render('profile', { errorMessage: 'User not found' });
        }
        res.render('profile', { user });
    } catch (error) {
        console.error(error);
        return res.status(500).render('profile', { errorMessage: 'Server error. Please try again later.' });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.render('login', { successMessage: 'You have been logged out successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


module.exports = {
    register,
    login,
    profile,
    logout,
};
