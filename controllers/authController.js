const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateAuthToken = require('../utils/authToken');
const handleErrors = require('../utils/errorHandler');


const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).render('register', { errors: ['User already exists'] });
        }

        user = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        res.status(201).render('login');
    } catch (error) {
        handleErrors(res, error, 'register');
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
        res.redirect('/api/auth/profile');
    } catch (error) {
        handleErrors(res, error, 'login');
    }
};

const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.render('profile', { user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.redirect('/');
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    register,
    login,
    profile,
    logout,
};
