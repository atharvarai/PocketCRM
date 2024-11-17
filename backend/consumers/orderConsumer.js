const Order = require('../models/Order');
const { createConsumer, consumeMessages } = require('../config/kafka');

const handleOrderMessage = async (message) => {
  console.log("Received order message:", message);
  const { customerEmail, orderDate, spending } = message;
  const newOrder = new Order({ customerEmail, orderDate, spending });

  try {
    await newOrder.save();
    console.log("Order placed for:", customerEmail);
  } catch (error) {
    console.log(`Error saving order for ${customerEmail}: ${error.message}`);
  }
};

const startConsumer = async () => {
  const consumer = createConsumer('order-group');
  console.log("Starting Order consumer...");
  await consumeMessages(consumer, 'orders', handleOrderMessage);
  console.log("Order consumer started.");
};

startConsumer();
