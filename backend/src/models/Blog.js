const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Blog title is required'] },
  slug: { type: String, unique: true },
  content: { type: String, required: [true, 'Blog content is required'] },
  excerpt: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  tags: [{ type: String }],
  category: { type: String, default: 'General' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublished: { type: Boolean, default: false },
  readingTime: { type: Number, default: 1 },
}, { timestamps: true });

// Auto-generate slug and calculate reading time before saving
blogSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    this.readingTime = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
