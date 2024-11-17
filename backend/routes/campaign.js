const express = require('express');
const router = express.Router();
const { createCampaign, deliveryReceipt } = require('../controllers/campaignController');

router.post('/', createCampaign); // Create a new campaign
router.post('/delivery-receipt', deliveryReceipt); // Update delivery receipt

module.exports = router;