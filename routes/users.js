const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Create or return existing user – defaults come from schema
router.post('/', async (req, res) => {
  try {
    const { clerkUserId, email, firstName = '', lastName = '' } = req.body;

    // Check if user exists
    let user = await User.findOne({ clerkUserId });
    if (user) {
      return res.json(user);
    }

    // Create new user – only pass required fields
    const newUser = new User({
      clerkUserId,
      email,
      firstName,
      lastName
      // stats fields come from schema defaults automatically
    });

    await newUser.save();
    return res.status(201).json(newUser);

  } catch (err) {
    console.error('User creation error:', err);
    return res.status(500).json({ message: 'Failed to create user', error: err.message });
  }
});

// ✅ Fetch user
router.get('/:clerkUserId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkUserId: req.params.clerkUserId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch user', error: err.message });
  }
});

// ✅ Update user
router.patch('/:clerkUserId', async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId: req.params.clerkUserId },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(updatedUser);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to update user', error: err.message });
  }
});

module.exports = router;
