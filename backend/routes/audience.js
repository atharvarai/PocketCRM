const express = require('express');
const router = express.Router();
const audienceController = require('../controllers/audienceController');

router.post('/', audienceController.createAudience);

router.get('/:audienceName', audienceController.getClientsByAudienceName);

router.get('/', audienceController.getAllAudiences);

router.get('/:id', audienceController.getAudienceById);

router.put('/:id', audienceController.updateAudienceById);

router.delete('/:id', audienceController.deleteAudienceById);

module.exports = router;