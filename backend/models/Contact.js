const mongoose = require('mongoose');
const validator = require('validator');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'responded'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);
