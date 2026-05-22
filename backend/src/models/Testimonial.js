const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: [true, 'Client name is required'] },
  company: { type: String, default: '' },
  feedback: { type: String, required: [true, 'Feedback is required'] },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  image: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
