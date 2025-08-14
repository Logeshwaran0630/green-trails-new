const mongoose = require('mongoose');
require('dotenv').config();

// Make sure your .env has:
// MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/greentrails?retryWrites=true&w=majority

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB Atlas!'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

module.exports = mongoose;
