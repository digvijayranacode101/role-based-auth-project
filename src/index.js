const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbconnect');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Sample route
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {        
    res.send('Hello, World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});  