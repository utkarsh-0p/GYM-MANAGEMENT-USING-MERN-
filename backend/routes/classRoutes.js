const express = require('express');
const router = express.Router();
const {
  getAllClasses,
  getClassById,
  createClass,
  updateClass,
  deleteClass,
  enrollInClass,
  unenrollFromClass,
  checkClassAvailability,
  getUserClasses
} = require('../controllers/classController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.get('/', getAllClasses);
router.get('/:id', getClassById);
router.post('/', protect, isAdmin, createClass);
router.put('/:id', protect, isAdmin, updateClass);
router.delete('/:id', protect, isAdmin, deleteClass);
router.post('/:id/enroll', protect, enrollInClass);
router.post('/:id/unenroll', protect, unenrollFromClass);
router.get('/:id/availability', checkClassAvailability);
router.get('/user/enrolled', protect, getUserClasses);

module.exports = router;
