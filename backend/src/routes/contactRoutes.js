const express = require('express');
const router = express.Router();
const { submitContact, getMessages, markAsRead, deleteMessage } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', submitContact);           // Public — submit form
router.get('/', protect, getMessages);     // Admin — view all
router.put('/:id', protect, markAsRead);   // Admin — mark read
router.delete('/:id', protect, deleteMessage); // Admin — delete

module.exports = router;
