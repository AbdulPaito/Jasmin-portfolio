const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  heroTitle: { type: String, default: 'Jasmin Paito' },
  heroSubtitle: { type: String, default: 'Accounting Assistant | Tax, Bookkeeping & Administrative Support' },
  profileImage: { type: String, default: '' },
  socialLinks: {
    linkedin: { type: String, default: 'https://linkedin.com/in/jasminpaito' },
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
  },
  contactInfo: {
    email: { type: String, default: 'jasminpaito11@gmail.com' },
    phone: { type: String, default: '403-671-9479' },
    address: { type: String, default: 'Calgary, SW' },
    whatsapp: { type: String, default: '4036719479' },
    mapEmbedUrl: { type: String, default: '' },
  },
  resumeUrl: { type: String, default: '' },
  siteTitle: { type: String, default: 'Jasmin Paito | Accounting Professional' },
  siteDescription: { type: String, default: 'Professional Accounting Assistant specializing in tax preparation, bookkeeping, and financial consulting.' },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
