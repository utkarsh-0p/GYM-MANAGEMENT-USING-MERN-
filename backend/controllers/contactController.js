const Contact = require('../models/Contact');

// Submit contact form
exports.submitContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all contact submissions (admin only)
exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update contact status (admin only)
exports.updateContactStatus = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
