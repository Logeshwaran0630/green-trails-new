// index.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
require('./db'); // DB connection

const app = express();
app.use(cors());
app.use(express.json());

app.use('/users', require('./routes/users'));
app.use('/activities', require('./routes/activities')); // Add activities routes

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));