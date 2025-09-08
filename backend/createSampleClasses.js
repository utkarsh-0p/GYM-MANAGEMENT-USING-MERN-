const mongoose = require('mongoose');
const Class = require('./models/Class');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/pulsegym', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const sampleClasses = [
  {
    name: 'Spin Class',
    description: 'High-energy indoor cycling class with intervals and resistance training.',
    trainer: 'Emma Davis',
    capacity: 18,
    schedule: {
      dayOfWeek: 'Monday',
      timeSlot: '19:00'
    },
    enrolledUsers: []
  },
  {
    name: 'Yoga Flow',
    description: 'Dynamic yoga sequences that improve flexibility, strength, and mental clarity.',
    trainer: 'Sarah Wilson',
    capacity: 15,
    schedule: {
      dayOfWeek: 'Tuesday',
      timeSlot: '08:00'
    },
    enrolledUsers: []
  },
  {
    name: 'HIIT Training',
    description: 'High-intensity interval training that combines cardio and strength exercises.',
    trainer: 'Mike Johnson',
    capacity: 20,
    schedule: {
      dayOfWeek: 'Wednesday',
      timeSlot: '06:00'
    },
    enrolledUsers: []
  },
  {
    name: 'Strength & Conditioning',
    description: 'Comprehensive strength training program focusing on proper form and progressive overload.',
    trainer: 'John Smith',
    capacity: 12,
    schedule: {
      dayOfWeek: 'Thursday',
      timeSlot: '17:00'
    },
    enrolledUsers: []
  }
];

async function createSampleClasses() {
  try {
    // Clear existing classes
    await Class.deleteMany({});
    
    // Create new classes
    const createdClasses = await Class.create(sampleClasses);
    console.log('Sample classes created:', createdClasses);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating sample classes:', error);
    mongoose.connection.close();
  }
}

createSampleClasses();
