const express = require('express');
const router = express.Router();
const { getBlogs, getAllBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getBlogs).post(protect, createBlog);
router.get('/all', protect, getAllBlogs);
router.get('/:slug', getBlogBySlug);
router.route('/edit/:id').put(protect, updateBlog).delete(protect, deleteBlog);

module.exports = router;
