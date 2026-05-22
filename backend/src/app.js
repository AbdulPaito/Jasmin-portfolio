const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');

// Import route files
const authRoutes = require('./routes/authRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const skillRoutes = require('./routes/skillRoutes');
const blogRoutes = require('./routes/blogRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Security middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000,
  message: { message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// CORS
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body parsers
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Jasmin Portfolio API is running' });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
