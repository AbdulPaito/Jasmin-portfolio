const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  biography: { type: String, default: '' },
  education: [{
    degree: { type: String },
    institution: { type: String },
    year: { type: String },
  }],
  experience: [{
    title: { type: String },
    company: { type: String },
    duration: { type: String },
    description: { type: String },
  }],
  certifications: [{
    name: { type: String },
    issuer: { type: String },
    year: { type: String },
    image: { type: String },
  }],
  achievements: [{
    title: { type: String },
    description: { type: String },
  }],
  resumeUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
