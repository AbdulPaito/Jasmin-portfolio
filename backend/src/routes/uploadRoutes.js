const express = require('express');
const router = express.Router();
const { uploadFile, deleteFile } = require('../controllers/uploadController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/', protect, upload.single('file'), uploadFile);
router.delete('/', protect, deleteFile);

module.exports = router;
