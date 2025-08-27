const express = require('express');
const router = express.Router();
const User = require('../models/User');

// =====================
// Users Routes
// =====================

// Create or return existing user – defaults come from schema
router.post('/', async (req, res) => {
  try {
    const { clerkUserId, email, firstName = '', lastName = '', role = 'user' } = req.body;

    // Check if user already exists
    let user = await User.findOne({ clerkUserId });
    if (user) {
      return res.json(user);
    }

    // Create new user with provided data
    const newUser = new User({ 
      clerkUserId, 
      email, 
      firstName, 
      lastName, 
      role,
      profileCompleted: false,
      checkIns: 0,
      drivesJoined: 0,
      badges: 0
    });

    await newUser.save();
    return res.status(201).json(newUser);

  } catch (err) {
    console.error('User creation error:', err);
    return res.status(500).json({ 
      message: 'Failed to create user', 
      error: err.message 
    });
  }
});

// Fetch user by clerkUserId
router.get('/:clerkUserId', async (req, res) => {
  try {
    const user = await User.findOne({ clerkUserId: req.params.clerkUserId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    console.error('User fetch error:', err);
    return res.status(500).json({ 
      message: 'Failed to fetch user', 
      error: err.message 
    });
  }
});

// Update user
router.patch('/:clerkUserId', async (req, res) => {
  try {
    const { clerkUserId } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { clerkUserId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(updatedUser);
  } catch (err) {
    console.error('User update error:', err);
    return res.status(500).json({ 
      message: 'Failed to update user', 
      error: err.message 
    });
  }
});

// Delete user (optional)
router.delete('/:clerkUserId', async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({ 
      clerkUserId: req.params.clerkUserId 
    });
    
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('User deletion error:', err);
    return res.status(500).json({ 
      message: 'Failed to delete user', 
      error: err.message 
    });
  }
});

module.exports = router;