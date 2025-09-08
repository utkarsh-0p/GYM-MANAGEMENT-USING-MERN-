const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  emergencyContact: {
    type: String,
    trim: true
  },
  healthConditions: {
    type: String,
    trim: true
  },
  preferredSchedule: {
    type: String,
    required: true,
    enum: ['morning', 'afternoon', 'evening']
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'cancelled'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Ensure user can only enroll once in a class
enrollmentSchema.index({ user: 1, class: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', enrollmentSchema);
