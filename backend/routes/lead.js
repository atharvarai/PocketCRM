const express = require('express');
const router = express.Router();
const Client = require('../models/Client');

router.post('/', async (req, res) => {
  const { name, email, totalSpends, maxVisits, lastVisit } = req.body;

  if (!name || !email || !totalSpends || !maxVisits || !lastVisit) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newClient = new Client({
      name,
      email,
      totalSpends,
      maxVisits,
      lastVisit
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

module.exports = router;