const express = require('express');
const morgan = require('morgan');
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const clientRoutes = require('./routes/lead');
const orderRoutes = require('./routes/order');
const audienceRoutes = require('./routes/audience');
const campaignRoutes = require('./routes/campaign'); // Import campaign routes
require("dotenv").config();
const cors = require('cors');

// Suppress KafkaJS partitioner warning
process.env.KAFKAJS_NO_PARTITIONER_WARNING = "1";

// Kafka configuration and connection
const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'crm',
    brokers: ['localhost:9092'],
    logLevel: logLevel.ERROR  // Adjust log level to control verbosity
});

const producer = kafka.producer();

const initKafka = async () => {
    try {
        await producer.connect();
        console.log('Producer connected');
    } catch (error) {
        console.error('Failed to connect producer:', error);
        process.exit(1);  // Exit if Kafka cannot connect
    }
};

initKafka();  // Connect the producer at startup

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("tiny"));

// Set Cross-Origin-Opener-Policy header
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    next();
});

// Configure CORS as needed
app.use(cors());

// Routes
app.use("/", authRoutes);
app.use('/clients', clientRoutes);
app.use('/orders', orderRoutes);
app.use('/audience', audienceRoutes);
app.use('/campaigns', campaignRoutes); // Use campaign routes

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    try {
        await connectDB();
        console.log(`Server listening on port: ${PORT}`);
    } catch (error) {
        console.error("Database connection failed:", error);
    }
});