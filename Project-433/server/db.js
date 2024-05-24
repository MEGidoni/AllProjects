// db.js
const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB Atlas connection
mongoose.connect(process.env.MONGO_LINK)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

module.exports = mongoose;
