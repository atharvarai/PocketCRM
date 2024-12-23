const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

router.post('/', async (req, res) => {
  const { name, email, totalSpends, maxVisits } = req.body;

  if (!name || !email || !totalSpends || !maxVisits) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newClient = new Client({
      name,
      email,
      totalSpends,
      maxVisits,
      lastVisit: new Date(),
    });

    const savedClient = await newClient.save();
    res.status(201).json(savedClient);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    res.status(500).json({ message: 'Error saving Client.', error });
  }
});


router.put('/:id', async (req, res) => {
  const { name, email, totalSpends, maxVisits } = req.body;

  if (!name || !email || !totalSpends || !maxVisits) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const existingClient = await Client.findOne({ email });
    if (existingClient && existingClient._id.toString() !== req.params.id) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const updatedClient = await Client.findByIdAndUpdate(req.params.id, {
      name,
      email,
      totalSpends,
      maxVisits,
      lastVisit: new Date(),
    }, { new: true });

    if (!updatedClient) return res.status(404).json({ message: 'Client not found' });

    res.json(updatedClient);
  } catch (error) {
    res.status(500).json({ message: 'Error updating Client.', error });
  }
});

router.get('/', async (req, res) => {
  const sortField = req.query.sort;
  const sortOrder = req.query.order || 'desc';

  const sortOptions = sortField ? { [sortField]: sortOrder === 'desc' ? -1 : 1 } : {};

  try {
    const clients = await Client.find().sort(sortOptions);
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedClient = await Client.findByIdAndDelete(req.params.id);
    if (!deletedClient) return res.status(404).json({ message: 'Client not found' });
    res.json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;