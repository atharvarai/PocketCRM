// const CommunicationLog = require('../models/CommunicationLog');
// const Client = require('../models/Client');
// const { produceMessage } = require('../config/kafka');

// const createCampaign = async (req, res) => {
//   const { audienceCriteria, message } = req.body;
//   try {
//     console.log('Audience Criteria:', audienceCriteria);
//     const audience = await Client.find(audienceCriteria);
//     console.log('Audience Found:', audience.length);
//     if (audience.length === 0) {
//       res.status(404).send('No audience found matching criteria');
//       return;
//     }
//     const logs = audience.map(client => ({
//       customerEmail: client.email,
//       message,
//     }));
//     await CommunicationLog.insertMany(logs);
//     res.json(logs);

//     logs.forEach(log => {
//       const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';
//       produceMessage('campaigns', { customerEmail: log.customerEmail, status }).catch(console.error);
//     });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// const deliveryReceipt = async (req, res) => {
//   const { email, status } = req.body;
//   try {
//     const log = await CommunicationLog.findOne({ customerEmail: email });
//     if (log) {
//       log.status = status;
//       await log.save();
//     }
//     res.send('Delivery status updated');
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

// module.exports = {
//   createCampaign,
//   deliveryReceipt
// };


// backend/controllers/campaignController.js
const CommunicationLog = require('../models/CommunicationLog');
const Client = require('../models/Client');
const Campaign = require('../models/Campaign');
const { produceMessage } = require('../config/kafka');

// const createCampaign = async (req, res) => {
//   const { name, audienceCriteria, message } = req.body;

//   try {
//     // Save the campaign details
//     const campaign = new Campaign({ name, audienceCriteria, message });
//     await campaign.save();

//     // Find audience based on criteria
//     const audience = await Client.find(audienceCriteria);
//     console.log('Audience Found:', audience.length);

//     if (audience.length === 0) {
//       return res.status(404).send('No audience found matching criteria');
//     }

//     const logs = audience.map(client => ({
//       customerEmail: client.email,
//       message,
//       status: 'PENDING' // Initial status before sending
//     }));

//     await CommunicationLog.insertMany(logs);

//     // Send messages to Kafka for processing
//     logs.forEach(log => {
//       const status = Math.random() < 0.9 ? 'SENT' : 'FAILED'; // Simulate delivery status
//       produceMessage('campaigns', { customerEmail: log.customerEmail, status }).catch(console.error);
//     });

//     res.status(201).json({ campaign, logs });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };


const createCampaign = async (req, res) => {
  const { name, audienceCriteria, message } = req.body;

  try {
    // Save the campaign details
    const campaign = new Campaign({ name, audienceCriteria, message });
    await campaign.save();

    // Log audience criteria for debugging
    console.log('Audience Criteria:', audienceCriteria);

    // Constructing the query based on audience criteria
    const query = {};

    if (audienceCriteria.totalSpends) {
      query.totalSpends = audienceCriteria.totalSpends; // Use operator directly
    }

    if (audienceCriteria.maxVisits) {
      query.maxVisits = audienceCriteria.maxVisits; // Use operator directly
    }

    // Find audience based on constructed query
    const audience = await Client.find(query);

    console.log('Audience Found:', audience.length);

    if (audience.length === 0) {
      return res.status(404).send('No audience found matching criteria');
    }

    const logs = audience.map(client => ({
      customerEmail: client.email,
      message,
      status: 'PENDING' // Initial status before sending
    }));

    await CommunicationLog.insertMany(logs);

    // Send messages to Kafka for processing
    logs.forEach(log => {
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED'; // Simulate delivery status
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