import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import SEO from '../../components/common/SEO';
import { getTestimonials } from '../../services/testimonialService';
import { getInitials } from '../../utils/helpers';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTestimonials().then(r => setTestimonials(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Testimonials" description="What clients say about Jasmin Paito's accounting services." />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/[0.04] rounded-full blur-[120px]" />
        </div>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
              <span className="w-8 h-[2px] bg-emerald" /> Client Feedback <span className="w-8 h-[2px] bg-emerald" />
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Testimonials
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Hear from professionals and businesses I've had the pleasure of working with.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-light-gray">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {loading ? (
            <div className="flex justify-center py-20"><div className="loader-spinner" /></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div key={t._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-emerald/20 transition-all duration-300 group relative"
                >
                  <FaQuoteLeft className="text-emerald/10 text-4xl absolute top-6 right-6" />
                  <div className="flex gap-1 mb-5">
                    {[1,2,3,4,5].map(s => (
                      <FaStar key={s} size={16} className={s <= t.rating ? 'text-gold' : 'text-gray-200'} />
                    ))}
                  </div>
                  <p className="text-slate-custom leading-relaxed mb-6 italic text-[0.95rem]">
                    "{t.feedback}"
                  </p>
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                    {t.image ? (
                      <img src={t.image} alt={t.clientName} className="w-12 h-12 rounded-full object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center">
                        <span className="text-emerald font-bold text-sm">{getInitials(t.clientName)}</span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-bold text-navy text-sm">{t.clientName}</h4>
                      {t.company && <p className="text-slate-custom text-xs">{t.company}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TestimonialsPage;
