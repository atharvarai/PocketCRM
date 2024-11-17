require('dotenv').config();
const mongoose = require('mongoose')
const connectDB = async () => {
    const uri = process.env.MONGO_URI;
    try {
        await mongoose.connect(uri);
        console.log("Database Connection Established...");
    } catch (error) {
        console.error("Database Connection Failed", error);
        throw error;
    }
}

module.exports = connectDB