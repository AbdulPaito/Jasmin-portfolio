import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/common/SEO';
import { getSkills } from '../../services/skillService';

const categories = [
  { key: 'all', label: 'All Skills' },
  { key: 'accounting', label: 'Accounting' },
  { key: 'software', label: 'Software' },
  { key: 'communication', label: 'Communication' },
];

const SkillsPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('all');

  useEffect(() => {
    getSkills().then(r => setSkills(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = active === 'all' ? skills : skills.filter(s => s.category === active);

  return (
    <>
      <SEO title="Skills" description="Jasmin Paito's professional skills in accounting, software, and communication." />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/[0.04] rounded-full blur-[120px]" />
        </div>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
              <span className="w-8 h-[2px] bg-emerald" /> Expertise <span className="w-8 h-[2px] bg-emerald" />
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Professional Skills
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Proficiency across accounting tools, software platforms, and professional competencies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section className="section-padding bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map(cat => (
              <button key={cat.key} onClick={() => setActive(cat.key)}
                className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  active === cat.key
                    ? 'bg-emerald text-white shadow-lg shadow-emerald/25'
                    : 'bg-light-gray text-slate-custom hover:bg-gray-100 border border-gray-200'
                }`}>
                {cat.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><div className="loader-spinner" /></div>
          ) : (
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-x-16 gap-y-8">
              {filtered.map((skill, i) => (
                <motion.div key={skill._id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group"
                >
                  <div className="flex justify-between mb-3">
                    <span className="font-semibold text-navy group-hover:text-emerald transition-colors">{skill.name}</span>
                    <span className="text-emerald font-bold text-sm bg-emerald/10 px-2.5 py-0.5 rounded-full">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.05, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-emerald to-emerald-light rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 rounded-full" style={{ animation: 'shimmer 2s infinite', backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)' }} />
                    </motion.div>
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

export default SkillsPage;
