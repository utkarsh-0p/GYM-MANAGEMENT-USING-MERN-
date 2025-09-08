const Class = require('../models/Class');

// Get all classes
exports.getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find().populate('enrolledUsers', 'name email');
    res.json(classes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get class by ID
exports.getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id)
      .populate('enrolledUsers', 'name email');
    
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    
    res.json(classItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Create class (admin only)
exports.createClass = async (req, res) => {
  try {
    const classItem = await Class.create(req.body);
    res.status(201).json(classItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update class (admin only)
exports.updateClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json(classItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete class (admin only)
exports.deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);
    
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    res.json({ message: 'Class deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Enroll in class
exports.enrollInClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Check if class is full (including pending enrollments)
    const Enrollment = require('../models/Enrollment');
    const pendingEnrollments = await Enrollment.countDocuments({
      class: req.params.id,
      status: { $in: ['pending', 'approved'] }
    });

    if (pendingEnrollments >= classItem.capacity) {
      return res.status(400).json({ message: 'Class is full' });
    }

    // Check if user already has a pending or approved enrollment
    const existingEnrollment = await Enrollment.findOne({
      user: req.user._id,
      class: req.params.id,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingEnrollment) {
      return res.status(400).json({ 
        message: `You already have a ${existingEnrollment.status} enrollment for this class`
      });
    }

    // Create a new enrollment
    const enrollment = await Enrollment.create({
      user: req.user._id,
      class: req.params.id,
      status: 'pending',
      ...req.body
    });

    await enrollment.populate('class', 'name schedule');
    res.status(201).json(enrollment);
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Unenroll from class
exports.unenrollFromClass = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Check if user is enrolled
    const userIndex = classItem.enrolledUsers.indexOf(req.user._id);
    if (userIndex === -1) {
      return res.status(400).json({ message: 'Not enrolled in this class' });
    }

    // Remove user from class
    classItem.enrolledUsers.splice(userIndex, 1);
    await classItem.save();

    res.json({ message: 'Successfully unenrolled from class' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Check class availability
exports.checkClassAvailability = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Get count of pending and approved enrollments
    const Enrollment = require('../models/Enrollment');
    const enrollmentCount = await Enrollment.countDocuments({
      class: req.params.id,
      status: { $in: ['pending', 'approved'] }
    });

    const availability = {
      totalCapacity: classItem.capacity,
      enrolledCount: enrollmentCount,
      availableSpots: Math.max(0, classItem.capacity - enrollmentCount),
      isFullyBooked: enrollmentCount >= classItem.capacity
    };

    res.json(availability);
  } catch (error) {
    console.error('Availability check error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get user's enrolled classes
exports.getUserClasses = async (req, res) => {
  try {
    const classes = await Class.find({
      enrolledUsers: req.user._id
    }).populate('enrolledUsers', 'name email');

    res.json(classes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
