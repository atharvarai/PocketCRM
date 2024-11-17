const mongoose = require('mongoose');
const { createConsumer, consumeMessages } = require('../config/kafka');
const Client = require('../models/Client');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Database Connection Established...");
  } catch (error) {
    console.error("Database Connection Failed", error);
    process.exit(1);
  }
};

async function saveClient(data) {
  console.log(`Attempting to save client: ${JSON.stringify(data)}`);
  const newClient = new Client(data);
  try {
    const savedClient = await newClient.save();
    console.log(`Client successfully saved: ${JSON.stringify(savedClient)}`);
  } catch (error) {
    console.error("Error saving client:", error.message); // Log error message
    if (error.errors) {
      console.error("Validation errors:", error.errors); // Log specific validation errors if any
    }
  }
}

async function handleClientMessage({ topic, partition, message }) {
  const messageValue = message.value.toString();
  console.log(`Received message on ${topic} at partition ${partition}, offset ${message.offset}: ${messageValue}`);

  let parsedValue;
  try {
    parsedValue = JSON.parse(messageValue);
    console.log("Parsed message:", parsedValue);
    await saveClient(parsedValue);
  } catch (error) {
    console.error("Error processing message: Invalid JSON format", error);
    console.error("Failed message content was:", messageValue);
  }
}

async function startConsumer() {
  await connectDB();
  const consumer = createConsumer('client-group');
  console.log("Starting client consumer...");
  await consumer.connect();
  await consumer.subscribe({ topic: 'clients', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      await handleClientMessage({ topic, partition, message }).catch(error => {
        console.error('Error in message handling:', error);
      });
    }
  });

  console.log("Client consumer is active and listening...");
}

startConsumer();
