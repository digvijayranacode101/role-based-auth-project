const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/authMiddleware');
const authorizedRoles = require('../middlewares/roleMiddleware');

// only admin can access this route
router.get('/admin' , verifyToken, authorizedRoles("admin"), (req, res) => {
    res.json({
        message: 'Admin route accessed'
    });
});

// Both admin manager can access this route
router.get('/manager', verifyToken, authorizedRoles("admin", "manager"), (req, res) => {
    res.send({
        message: 'Manager route accessed'
    });
}); 

// all can access this route
router.get('/user', verifyToken, authorizedRoles("admin", "manager", "user"), (req, res) => {
    res.send('User route accessed');
});

module.exports = router;
