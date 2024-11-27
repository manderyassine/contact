const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Create an Express app
const app = express();

// MongoDB Connection URI from .env file
const mongoURI = process.env.MONGODB_URI;

// MongoDB Contact Schema
const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, required: true },
  birthdate: { type: Number, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Start the Express server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

module.exports = { Contact };  // Export Contact model for use in other files
