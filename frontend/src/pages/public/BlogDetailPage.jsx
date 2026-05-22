import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiArrowLeft, FiTag } from 'react-icons/fi';
import SEO from '../../components/common/SEO';
import { getBlogBySlug } from '../../services/blogService';
import { formatDate } from '../../utils/formatDate';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogBySlug(slug).then(r => setBlog(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-light-gray"><div className="loader-spinner" /></div>;
  if (!blog) return (
    <div className="min-h-screen flex items-center justify-center bg-light-gray">
      <div className="text-center">
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-2xl font-bold text-navy mb-2">Blog Post Not Found</h2>
        <Link to="/blog" className="text-emerald font-semibold hover:underline">← Back to Blog</Link>
      </div>
    </div>
  );

  return (
    <>
      <SEO title={blog.title} description={blog.excerpt} />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/[0.04] rounded-full blur-[120px]" />
        </div>
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {blog.category && (
              <span className="inline-block bg-emerald/15 text-emerald text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                {blog.category}
              </span>
            )}

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><FiCalendar size={14} /> {formatDate(blog.createdAt)}</span>
              <span className="flex items-center gap-1.5"><FiClock size={14} /> {blog.readingTime} min read</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-20 bg-white">
        <div className="w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Cover Image */}
          {blog.coverImage && (
            <div className="w-full mb-10">
              <img src={blog.coverImage} alt={blog.title} className="w-full h-[300px] md:h-[400px] object-cover object-top rounded-2xl shadow-lg" />
            </div>
          )}
          <article className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-gray-100">
              <FiTag className="text-slate-custom" />
              {blog.tags.map(tag => (
                <span key={tag} className="bg-light-gray text-slate-custom text-xs font-medium px-3 py-1.5 rounded-full border border-gray-200">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Back */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link to="/blog" className="inline-flex items-center gap-2 text-emerald font-semibold hover:gap-3 transition-all">
              <FiArrowLeft /> Back to All Articles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailPage;
