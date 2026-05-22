const About = require('../models/About');

// @desc    Get about information (public)
// @route   GET /api/about
const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update about information (protected)
// @route   PUT /api/about
const updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create(req.body);
    } else {
      about = await About.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
    }
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAbout, updateAbout };
