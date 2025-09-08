const mongoose = require('mongoose');
const Enrollment = require('./Enrollment');

const classSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  trainer: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  schedule: {
    dayOfWeek: {
      type: String,
      required: true,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    timeSlot: {
      type: String,
      required: true
    }
  },
  enrolledUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  price: {
    type: Number,
    required: true,
    default: 0
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  duration: {
    type: Number,
    required: true,
    min: 15,
    max: 180
  }
}, {
  timestamps: true
});

// Virtual for getting current enrollment count
classSchema.virtual('currentEnrollments').get(async function() {
  const count = await Enrollment.countDocuments({
    class: this._id,
    status: { $in: ['pending', 'approved'] }
  });
  return count;
});

// Virtual for checking if class is full
classSchema.virtual('isFull').get(async function() {
  const enrollmentCount = await this.currentEnrollments;
  return enrollmentCount >= this.capacity;
});

// Add virtuals when converting to JSON
classSchema.set('toJSON', { virtuals: true });
classSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Class', classSchema);
