const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv').config();

const verifyToken = (req, res, next) => {
    let token;
    let authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
    } else {
        return res.status(403).send({ message: 'No token provided!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JSONWEBTOKEN_SECRET);
        console.log('Decoded token:', decoded);
        req.userId = decoded.userId;
        req.userRole = decoded.role; // Assuming the token contains the user's role
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Unauthorized!', error: err });
    }

};

module.exports = verifyToken;