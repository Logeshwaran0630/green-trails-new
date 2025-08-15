const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  age: { type: Number, default: null },
  city: { type: String, default: '' },
  profileCompleted: { type: Boolean, default: false },

  // ✅ Stats with defaults in schema only
  checkIns: { type: Number, default: 0 },
  drivesJoined: { type: Number, default: 0 },
  badges: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
