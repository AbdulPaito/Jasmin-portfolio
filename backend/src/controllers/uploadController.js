const cloudinary = require('../config/cloudinary');

// @desc    Upload file to Cloudinary
// @route   POST /api/upload
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({
      url: req.file.path,
      public_id: req.file.filename,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete file from Cloudinary
// @route   DELETE /api/upload
const deleteFile = async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) {
      return res.status(400).json({ message: 'Public ID is required' });
    }
    const result = await cloudinary.uploader.destroy(public_id);
    res.json({ message: 'File deleted successfully', result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { uploadFile, deleteFile };
