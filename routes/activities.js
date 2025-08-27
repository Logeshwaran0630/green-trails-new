// routes/activities.js
const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const User = require('../models/User');

// ✅ Create a new activity (NGO only)
router.post('/', async (req, res) => {
  try {
    const { title, description, location, date, maxParticipants, category, organizerId } = req.body;
    
    // Check if organizer is an NGO
    const organizer = await User.findOne({ clerkUserId: organizerId });
    if (!organizer || organizer.role !== 'ngo') {
      return res.status(403).json({ message: 'Only NGOs can create activities' });
    }

    const newActivity = new Activity({
      title,
      description,
      location,
      date,
      maxParticipants,
      category,
      organizer: organizer._id
    });

    await newActivity.save();
    
    // Populate organizer details in response
    await newActivity.populate('organizer', 'firstName lastName ngoName');
    
    return res.status(201).json(newActivity);
  } catch (err) {
    console.error('Activity creation error:', err);
    return res.status(500).json({ message: 'Failed to create activity', error: err.message });
  }
});

// ✅ Get all activities
router.get('/', async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate('organizer', 'firstName lastName ngoName')
      .populate('participants', 'firstName lastName');
      
    return res.json(activities);
  } catch (err) {
    return res.status(500).json({ message: 'Failed to fetch activities', error: err.message });
  }
});

// ✅ Join an activity
router.post('/:activityId/join', async (req, res) => {
  try {
    const { userId } = req.body;
    const { activityId } = req.params;
    
    const user = await User.findOne({ clerkUserId: userId });
    const activity = await Activity.findById(activityId);
    
    if (!user || !activity) {
      return res.status(404).json({ message: 'User or activity not found' });
    }
    
    // Check if user is already participating
    if (activity.participants.includes(user._id)) {
      return res.status(400).json({ message: 'User already joined this activity' });
    }
    
    // Check if activity is full
    if (activity.maxParticipants && activity.participants.length >= activity.maxParticipants) {
      return res.status(400).json({ message: 'Activity is full' });
    }
    
    activity.participants.push(user._id);
    await activity.save();
    
    // Update user's drivesJoined count
    user.drivesJoined += 1;
    await user.save();
    
    return res.json({ message: 'Successfully joined activity', activity });
  } catch (err) {
    return res.status(500).json({ message: 'Failed to join activity', error: err.message });
  }
});

module.exports = router;