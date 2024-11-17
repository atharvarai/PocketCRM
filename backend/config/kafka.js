const { Kafka, Partitioners } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'crm',
    brokers: ['localhost:9092']
});

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
    allowAutoTopicCreation: true,
    retry: {
        initialRetryTime: 300,
        retries: 10
    }
});

const initKafka = async () => {
    try {
        await producer.connect();
        console.log('Producer connected');
    } catch (error) {
        console.error('Failed to connect producer:', error);
    }
};

initKafka();

const createConsumer = (groupId) => {
    const consumer = kafka.consumer({
        groupId,
        sessionTimeout: 30000,
        heartbeatInterval: 3000
    });

    const runConsumer = async () => {
        await consumer.connect();
        console.log(`Consumer ${groupId} connected`);
        return consumer;
    };

    runConsumer().catch(error => console.error(`Failed to start consumer ${groupId}:`, error));
    return consumer;
};

const produceMessage = async (topic, message) => {
    console.log(`Sending message to ${topic}:`, message);
    try {
        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });
    } catch (error) {
        console.error(`Failed to send message to ${topic}:`, error);
    }
};

const consumeMessages = async (consumer, topic, handler) => {
    await consumer.subscribe({ topic, fromBeginning: true });
    console.log(`Subscribed to ${topic}`);

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Received message from ${topic}[${partition}] @${message.offset}`);
            try {
                await handler({ topic, partition, message });
            } catch (error) {
                console.error('Error in message handling:', error);
            }
        },
    });
};

module.exports = { produceMessage, createConsumer, consumeMessages };