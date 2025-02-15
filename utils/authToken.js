const jwt = require('jsonwebtoken');

const generateAuthToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

module.exports = generateAuthToken;
