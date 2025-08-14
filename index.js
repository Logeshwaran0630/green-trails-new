const express = require('express');
const app = express();
require('dotenv').config();
require('./db'); // MongoDB connection file

app.use(express.json()); // for JSON body parsing

// User routes
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend server started on port ${PORT}`));
