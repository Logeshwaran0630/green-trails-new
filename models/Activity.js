// models/Activity.js
const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  organizer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  participants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  maxParticipants: { type: Number, default: null },
  category: { 
    type: String, 
    enum: ['cleanup', 'tree-planting', 'awareness', 'other'],
    default: 'other'
  },
  status: { 
    type: String, 
    enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
    default: 'upcoming'
  }
}, { timestamps: true });

module.exports = mongoose.model('Activity', activitySchema);