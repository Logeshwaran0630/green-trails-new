const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  age: Number,
  city: String,
  profileCompleted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
