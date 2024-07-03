const express = require('express');
const { register, login ,profile,logout} = require('../controllers/authController');
const router = express.Router();
const { auth } = require('../middleware/auth');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, profile);
router.get('/logout', logout);

module.exports = router;
