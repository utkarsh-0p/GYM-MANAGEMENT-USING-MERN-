require('dotenv').config();
const mongoose = require('mongoose');
const Class = require('../models/Class');

const classes = [
  {
    name: 'Spin Class',
    description: 'High-energy indoor cycling class with intervals and resistance training.',
    trainer: 'Emma Davis',
    capacity: 18,
    schedule: {
      dayOfWeek: 'Monday',
      timeSlot: '7:00 PM - 8:00 PM'
    },
    price: 25,
    level: 'intermediate',
    duration: 60
  },
  {
    name: 'Yoga Flow',
    description: 'Dynamic yoga sequences that improve flexibility, strength, and mental clarity.',
    trainer: 'Sarah Wilson',
    capacity: 15,
    schedule: {
      dayOfWeek: 'Tuesday',
      timeSlot: '8:00 AM - 9:00 AM'
    },
    price: 20,
    level: 'beginner',
    duration: 60
  },
  {
    name: 'HIIT Training',
    description: 'High-intensity interval training that combines cardio and strength exercises.',
    trainer: 'Mike Johnson',
    capacity: 20,
    schedule: {
      dayOfWeek: 'Wednesday',
      timeSlot: '6:00 AM - 7:00 AM'
    },
    price: 30,
    level: 'advanced',
    duration: 45
  },
  {
    name: 'Strength & Conditioning',
    description: 'Comprehensive strength training program focusing on proper form and progressive overload.',
    trainer: 'John Smith',
    capacity: 12,
    schedule: {
      dayOfWeek: 'Thursday',
      timeSlot: '5:00 PM - 6:00 PM'
    },
    price: 25,
    level: 'intermediate',
    duration: 60
  }
];

const seedClasses = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing classes
    await Class.deleteMany({});
    console.log('Deleted existing classes');

    // Insert new classes
    const createdClasses = await Class.create(classes);
    console.log('Created classes:', createdClasses.map(c => c.name));

    // Close connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding classes:', error);
    process.exit(1);
  }
};

seedClasses();
