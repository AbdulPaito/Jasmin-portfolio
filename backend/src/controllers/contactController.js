const Contact = require('../models/Contact');

// @desc    Submit contact form (public)
// @route   POST /api/contact
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ success: true, message: 'Message sent successfully! Jasmin will get back to you soon.' });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all messages (admin)
// @route   GET /api/contact
exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// @desc    Mark message as read (admin)
// @route   PUT /api/contact/:id
exports.markAsRead = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete message (admin)
// @route   DELETE /api/contact/:id
exports.deleteMessage = async (req, res, next) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    next(error);
  }
};
