import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiArrowRight } from 'react-icons/fi';
import { formatDate } from '../../utils/formatDate';
import { truncateText } from '../../utils/helpers';

const BlogCard = ({ blog, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group"
    >
      {/* Cover Image */}
      <div className="h-48 bg-gradient-to-br from-navy to-navy-light relative overflow-hidden">
        {blog.coverImage ? (
          <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-10">📊</span>
          </div>
        )}
        {blog.category && (
          <span className="absolute top-4 left-4 bg-emerald text-white text-xs font-semibold px-3 py-1 rounded-full">
            {blog.category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-slate-custom mb-3">
          <span>{formatDate(blog.createdAt)}</span>
          <span className="flex items-center gap-1"><FiClock size={12} /> {blog.readingTime} min read</span>
        </div>
        <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-emerald transition-colors line-clamp-2">
          {blog.title}
        </h3>
        <p className="text-slate-custom text-sm mb-4 line-clamp-2">{truncateText(blog.excerpt || blog.content?.replace(/<[^>]*>/g, ''), 100)}</p>
        <Link to={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-emerald font-semibold text-sm group/link">
          Read More <FiArrowRight className="group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
