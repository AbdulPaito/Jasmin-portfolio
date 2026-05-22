const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Service title is required'] },
  description: { type: String, required: [true, 'Service description is required'] },
  icon: { type: String, default: 'FiBriefcase' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
