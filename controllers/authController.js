const User = require('../models/User');

const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).render('register', { errors: ['User already exists'] });
        }

        user = new User({ username, email, password });
        await user.save();

        res.status(201).render('register', { successMessage: 'User registered successfully', token });
    } catch (error) {
        const errors = Object.values(error.errors).map((err) => err.message);
        res.status(400).render('register', { errors });
    }
};


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findByCredentials(email, password);

        const token = user.generateAuthToken();

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/api/auth/profile');
    } catch (error) {
        res.status(401).render('login', { errorMessage: 'Invalid credentials' });
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