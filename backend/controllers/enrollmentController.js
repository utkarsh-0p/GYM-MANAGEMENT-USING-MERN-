const Enrollment = require('../models/Enrollment');
const Class = require('../models/Class');

// Create new enrollment
exports.createEnrollment = async (req, res) => {
  try {
    console.log('Enrollment request body:', req.body);
    const { classId, ...enrollmentData } = req.body;

    if (!classId) {
      return res.status(400).json({ message: 'Class ID is required' });
    }

    // Check if class exists and has capacity
    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // Get current enrollment count
    const currentEnrollments = await Enrollment.countDocuments({
      class: classId,
      status: { $in: ['pending', 'approved'] }
    });

    if (currentEnrollments >= classItem.capacity) {
      return res.status(400).json({ message: 'Class is full' });
    }

    // Check if user is already enrolled
    const existingEnrollment = await Enrollment.findOne({
      user: req.user._id,
      class: classId,
      status: { $in: ['pending', 'approved'] }
    });

    if (existingEnrollment) {
      return res.status(400).json({ 
        message: `You already have a ${existingEnrollment.status} enrollment for this class`
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      name: enrollmentData.name,
      email: enrollmentData.email,
      phone: enrollmentData.phone,
      emergencyContact: enrollmentData.emergencyContact,
      healthConditions: enrollmentData.healthConditions,
      preferredSchedule: enrollmentData.preferredSchedule,
      user: req.user._id,
      class: classId,
      status: 'pending'
    });

    await enrollment.populate([
      { path: 'class', select: 'name schedule price level duration' },
      { path: 'user', select: 'name email' }
    ]);
    
    res.status(201).json(enrollment);
  } catch (error) {
    console.error('Create enrollment error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get user's enrollments
exports.getUserEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user._id })
      .populate('class', 'name schedule price level duration')
      .sort('-createdAt');
    res.json(enrollments);
  } catch (error) {
    console.error('Get user enrollments error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update enrollment status (admin only)
exports.updateEnrollmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'approved', 'rejected', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // If approving, check class capacity
    if (status === 'approved') {
      const currentEnrollments = await Enrollment.countDocuments({
        class: enrollment.class,
        status: { $in: ['pending', 'approved'] },
        _id: { $ne: enrollment._id }
      });

      const classItem = await Class.findById(enrollment.class);
      if (currentEnrollments >= classItem.capacity) {
        return res.status(400).json({ message: 'Class is now full' });
      }
    }

    enrollment.status = status;
    await enrollment.save();

    await enrollment.populate([
      { path: 'class', select: 'name schedule price level duration' },
      { path: 'user', select: 'name email' }
    ]);

    res.json(enrollment);
  } catch (error) {
    console.error('Update enrollment status error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get all enrollments (admin only)
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('user', 'name email')
      .populate('class', 'name schedule price level duration')
      .sort('-createdAt');
    res.json(enrollments);
  } catch (error) {
    console.error('Get all enrollments error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Get enrollments by class (admin only)
exports.getEnrollmentsByClass = async (req, res) => {
  try {
    const classId = req.params.classId;
    const enrollments = await Enrollment.find({ class: classId })
      .populate('user', 'name email')
      .populate('class', 'name schedule price level duration')
      .sort('-createdAt');
    res.json(enrollments);
  } catch (error) {
    console.error('Get class enrollments error:', error);
    res.status(400).json({ message: error.message });
  }
};

// Cancel enrollment (user can cancel their own enrollment)
exports.cancelEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (enrollment.status === 'cancelled') {
      return res.status(400).json({ message: 'Enrollment is already cancelled' });
    }

    enrollment.status = 'cancelled';
    await enrollment.save();

    await enrollment.populate([
      { path: 'class', select: 'name schedule price level duration' },
      { path: 'user', select: 'name email' }
    ]);

    res.json(enrollment);
  } catch (error) {
    console.error('Cancel enrollment error:', error);
    res.status(400).json({ message: error.message });
  }
};
