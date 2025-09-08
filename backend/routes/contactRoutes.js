const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  updateContactStatus
} = require('../controllers/contactController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.post('/', submitContact);
router.get('/', protect, isAdmin, getAllContacts);
router.put('/:id', protect, isAdmin, updateContactStatus);

module.exports = router;
