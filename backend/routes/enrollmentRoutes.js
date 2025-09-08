const express = require('express');
const router = express.Router();
const {
  createEnrollment,
  getUserEnrollments,
  updateEnrollmentStatus,
  getAllEnrollments,
  getEnrollmentsByClass,
  cancelEnrollment
} = require('../controllers/enrollmentController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

// User routes
router.post('/', protect, createEnrollment);
router.get('/my-enrollments', protect, getUserEnrollments);
router.delete('/:id/cancel', protect, cancelEnrollment);

// Class-specific routes
router.get('/class/:classId', protect, isAdmin, getEnrollmentsByClass);

// Admin routes
router.get('/', protect, isAdmin, getAllEnrollments);
router.patch('/:id/status', protect, isAdmin, updateEnrollmentStatus);

module.exports = router;
