const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Skill name is required'] },
  percentage: { type: Number, min: 0, max: 100, default: 50 },
  category: { type: String, enum: ['accounting', 'software', 'analysis', 'communication'], default: 'accounting' },
  icon: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
