const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.cookies.token || (req.header('Authorization') && req.header('Authorization').replace('Bearer ', ''));

    if (!token) {
        return res.redirect('/api/auth/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).redirect('/api/auth/login');
    }
};

module.exports = { auth };
