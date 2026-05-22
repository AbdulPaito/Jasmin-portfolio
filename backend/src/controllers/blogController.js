const Blog = require('../models/Blog');

// @desc    Get published blogs with pagination, search, category filter (public)
// @route   GET /api/blogs
const getBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const search = req.query.search || '';
    const category = req.query.category || '';

    let query = { isPublished: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }
    if (category) {
      query.category = category;
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      blogs,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all blogs including drafts (admin)
// @route   GET /api/blogs/all
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name').sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog by slug (public)
// @route   GET /api/blogs/:slug
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true }).populate('author', 'name');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new blog (protected)
// @route   POST /api/blogs
const createBlog = async (req, res) => {
  try {
    req.body.author = req.user._id;
    const blog = await Blog.create(req.body);
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a blog (protected)
// @route   PUT /api/blogs/:id
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    Object.assign(blog, req.body);
    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a blog (protected)
// @route   DELETE /api/blogs/:id
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getBlogs, getAllBlogs, getBlogBySlug, createBlog, updateBlog, deleteBlog };
