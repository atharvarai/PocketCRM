const CommunicationLog = require('../models/CommunicationLog');
const { createConsumer, consumeMessages } = require('../config/kafka');

const handleCampaignMessage = async (message) => {
  const { customerEmail, status } = message;

  try {
    const log = await CommunicationLog.findOne({ customerEmail });
    if (log) {
      log.status = status;
      await log.save();
      console.log(`Updated status for ${customerEmail} to ${status}`);
    }
  } catch (error) {
    console.error(`Error updating status for ${customerEmail}: ${error.message}`);
  }
};

const startConsumer = async () => {
  const consumer = createConsumer('campaign-group');
  await consumeMessages(consumer, 'campaigns', handleCampaignMessage);
};

startConsumer();