const CommunicationLog = require('../models/CommunicationLog');
const Client = require('../models/Client');
const Campaign = require('../models/Campaign');
const { produceMessage } = require('../config/kafka');

const createCampaign = async (req, res) => {
  const { name, audienceCriteria, message } = req.body;

  try {
    const campaign = new Campaign({ name, audienceCriteria, message });
    await campaign.save();

    console.log('Audience Criteria:', audienceCriteria);

    const query = {};

    if (audienceCriteria.totalSpends) {
      query.totalSpends = audienceCriteria.totalSpends;
    }

    if (audienceCriteria.maxVisits) {
      query.maxVisits = audienceCriteria.maxVisits;
    }

    const audience = await Client.find(query);

    console.log('Audience Found:', audience.length);

    if (audience.length === 0) {
      return res.status(404).send('No audience found matching criteria');
    }

    const logs = audience.map(client => ({
      customerEmail: client.email,
      message,
      status: 'PENDING'
    }));

    await CommunicationLog.insertMany(logs);

    logs.forEach(log => {
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
      produceMessage('campaigns', { customerEmail: log.customerEmail, status }).catch(console.error);
    });

    res.status(201).json({ campaign, logs });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

const deliveryReceipt = async (req, res) => {
  const { email, status } = req.body;
  try {
    const log = await CommunicationLog.findOne({ customerEmail: email });
    if (log) {
      log.status = status;
      await log.save();
    }
    res.send('Delivery status updated');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createCampaign,
  deliveryReceipt
};
