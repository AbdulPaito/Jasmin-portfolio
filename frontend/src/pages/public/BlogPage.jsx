import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiClock, FiArrowRight } from 'react-icons/fi';
import SEO from '../../components/common/SEO';
import { getBlogs } from '../../services/blogService';
import { formatDate } from '../../utils/formatDate';
import { truncateText } from '../../utils/helpers';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState(['All']);
  const activeCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    getBlogs({ limit: 50 }).then(r => {
      const allBlogs = r.data.blogs || r.data || [];
      const cats = ['All', ...new Set(allBlogs.map(b => b.category).filter(Boolean))];
      setCategories(cats);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const categoryQuery = activeCategory === 'All' ? '' : activeCategory;
    getBlogs({ search, category: categoryQuery })
      .then(r => setBlogs(r.data.blogs || r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [search, activeCategory]);

  return (
    <>
      <SEO title="Blog" description="Accounting tips, tax advice, and financial insights from Jasmin Paito." />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/[0.04] rounded-full blur-[120px]" />
        </div>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
              <span className="w-8 h-[2px] bg-emerald" /> Insights <span className="w-8 h-[2px] bg-emerald" />
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Blog & Articles
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Tips, insights, and updates on accounting, tax, and finance.
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-xl mx-auto mt-10 relative">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-14 pr-6 py-4 bg-white/[0.06] border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:border-emerald/50 focus:bg-white/[0.08] outline-none transition-all text-sm"
            />
          </div>

          {/* Categories */}
          {categories.length > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSearchParams(cat === 'All' ? {} : { category: cat })}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-emerald text-white shadow-lg shadow-emerald/20'
                      : 'bg-white/[0.06] text-gray-300 hover:bg-white/[0.1] hover:text-white border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-light-gray">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {loading ? (
            <div className="flex justify-center py-20"><div className="loader-spinner" /></div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-20">📝</div>
              <h3 className="text-xl font-bold text-navy mb-2">No articles found</h3>
              <p className="text-slate-custom">Check back later for new content.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, i) => (
                <motion.div key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link to={`/blog/${blog.slug}`} className="block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group h-full">
                    <div className="h-52 bg-gradient-to-br from-navy to-navy-light relative overflow-hidden">
                      {blog.coverImage ? (
                        <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy via-navy-light to-emerald/20">
                          <span className="text-7xl opacity-15">📊</span>
                        </div>
                      )}
                      {blog.category && (
                        <span className="absolute top-4 left-4 bg-emerald text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          {blog.category}
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 text-xs text-slate-custom mb-3">
                        <span>{formatDate(blog.createdAt)}</span>
                        <span className="flex items-center gap-1"><FiClock size={12} /> {blog.readingTime} min read</span>
                      </div>
                      <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-emerald transition-colors leading-snug line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-slate-custom text-sm leading-relaxed line-clamp-3 mb-4">
                        {truncateText(blog.excerpt || blog.content?.replace(/<[^>]*>/g, ''), 120)}
                      </p>
                      <span className="inline-flex items-center gap-2 text-emerald font-semibold text-sm group-hover:gap-3 transition-all">
                        Read More <FiArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPage;
