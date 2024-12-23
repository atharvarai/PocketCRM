const Audience = require('../models/Audience');
const Client = require('../models/Client');

exports.createAudience = async (req, res) => {
    try {
        const { name, criteria, visitCutoffDate } = req.body;

        const audience = new Audience({
            name,
            criteria,
            createdAt: new Date(),
            visitCutoffDate
        });

        const savedAudience = await audience.save();
        res.status(201).json(savedAudience);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getClientsByAudienceName = async (req, res) => {
    try {
        const { audienceName } = req.params;

        const normalizedAudienceName = audienceName.trim().toLowerCase();

        const audience = await Audience.findOne({
            name: new RegExp(`^${normalizedAudienceName.replace(/\s+/g, '\\s*')}$`, 'i')
        });

        if (!audience) return res.status(404).json({ message: 'Audience not found' });

        const { visitCutoffDate, criteria } = audience;

        const clientQuery = {
            lastVisit: { $lt: visitCutoffDate }
        };

        if (criteria.totalSpends) {
            clientQuery.totalSpends = criteria.totalSpends;
        }

        if (criteria.maxVisits) {
            clientQuery.maxVisits = criteria.maxVisits;
        }

        const clients = await Client.find(clientQuery);

        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllAudiences = async (req, res) => {
    try {
        const audiences = await Audience.find();
        res.json(audiences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAudienceById = async (req, res) => {
    try {
        const audience = await Audience.findById(req.params.id);
        if (!audience) return res.status(404).json({ message: 'Audience not found' });

        res.json(audience);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAudienceById = async (req, res) => {
    try {
        const { name, criteria, visitCutoffDate } = req.body;

        const updatedAudience = await Audience.findByIdAndUpdate(req.params.id, {
            name,
            criteria,
            visitCutoffDate
        }, { new: true });

        if (!updatedAudience) return res.status(404).json({ message: 'Audience not found' });

        res.json(updatedAudience);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an audience by ID
exports.deleteAudienceById = async (req, res) => {
    try {
        const deletedAudience = await Audience.findByIdAndDelete(req.params.id);

        if (!deletedAudience) return res.status(404).json({ message: 'Audience not found' });

        res.json({ message: 'Audience deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};