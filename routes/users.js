const express = require('express');
const router = express.Router();
const User = require('../models/User');

// 1. Create user (or return existing one)
router.post('/', async (req, res) => {
  try {
    const { clerkUserId, email, firstName = '', lastName = '' } = req.body;
    let user = await User.findOne({ clerkUserId });
    if (user) return res.json(user);

    user = new User({ clerkUserId, email, firstName, lastName });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user', error: err });
  }
});

// 2. Get user profile
router.get('/:clerkUserId', async (req, res) => {
  const user = await User.findOne({ clerkUserId: req.params.clerkUserId });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// 3. Update user profile
router.patch('/:clerkUserId', async (req, res) => {
  const user = await User.findOneAndUpdate(
    { clerkUserId: req.params.clerkUserId },
    req.body,
    { new: true }
  );
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

module.exports = router;
