import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiBook, FiDollarSign, FiClipboard, FiBarChart2, FiUsers, FiSearch, FiBriefcase } from 'react-icons/fi';
import SEO from '../../components/common/SEO';
import { getServices } from '../../services/serviceService';

const iconMap = { FiFileText, FiBook, FiDollarSign, FiClipboard, FiBarChart2, FiUsers, FiSearch, FiBriefcase };

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices().then(r => setServices(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Services" description="Accounting and financial services offered by Jasmin Paito." />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/[0.04] rounded-full blur-[120px]" />
        </div>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
              <span className="w-8 h-[2px] bg-emerald" /> What I Offer <span className="w-8 h-[2px] bg-emerald" />
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              My Services
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Comprehensive accounting and financial services tailored to meet your business needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-light-gray">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {loading ? (
            <div className="flex justify-center py-20"><div className="loader-spinner" /></div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => {
                const IconComp = iconMap[service.icon] || FiBriefcase;
                return (
                  <motion.div key={service._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -8 }}
                    className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald/20 transition-all duration-300 group"
                  >
                    <div className="w-16 h-16 bg-emerald/8 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald group-hover:scale-110 transition-all duration-300">
                      <IconComp className="text-3xl text-emerald group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-3 group-hover:text-emerald transition-colors">{service.title}</h3>
                    <p className="text-slate-custom leading-relaxed">{service.description}</p>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald/[0.04] rounded-full blur-[100px]" />
        </div>
        <div className="w-full max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            Need Accounting Help?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Let's discuss how I can support your business with professional accounting services.
          </p>
          <a href="/contact" className="btn-primary text-lg !px-10 !py-4">
            Get In Touch →
          </a>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
