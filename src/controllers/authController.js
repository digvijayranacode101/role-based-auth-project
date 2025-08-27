const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 10);
        console.log('Hashed Password:', hashedPassword);
        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: `User ${username} registered successfully` });
    } catch (error) {
        res
        .status(500)
        .json({ message: 'Server error register', error: error.message });
    }
}
const login = async (req, res) => {   
    try {  
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' ,username });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials password' });
        }
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JSONWEBTOKEN_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token, message: `User ${username} logged in successfully` });
    } catch (error) {
        res
        .status(500)
        .json({ message: 'Server error login', error: error.message });
    }
};
module.exports = { register, login };