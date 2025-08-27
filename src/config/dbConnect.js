const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_URL)
        console.log('MongoDB connected successfully',connect.connection.host, connect.connection.name);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;