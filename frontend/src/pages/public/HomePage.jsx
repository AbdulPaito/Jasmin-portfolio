import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiLinkedin, FiMail, FiPhone, FiCheckCircle, FiFileText, FiBook, FiDollarSign, FiClipboard, FiBarChart2, FiUsers, FiSearch, FiBriefcase, FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import SEO from '../../components/common/SEO';
import StatsCounter from '../../components/home/StatsCounter';
import { getSettings } from '../../services/settingsService';
import { getServices } from '../../services/serviceService';
import { getSkills } from '../../services/skillService';
import { getBlogs } from '../../services/blogService';
import { getTestimonials } from '../../services/testimonialService';
import { getAbout } from '../../services/aboutService';
import { formatDate } from '../../utils/formatDate';
import { truncateText, getInitials, getResumeViewUrl, getResumeDownloadUrl } from '../../utils/helpers';

const iconMap = { FiFileText, FiBook, FiDollarSign, FiClipboard, FiBarChart2, FiUsers, FiSearch, FiBriefcase };

const HomePage = () => {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [skills, setSkills] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, servicesRes, skillsRes, blogsRes, testimonialsRes, aboutRes] = await Promise.allSettled([
          getSettings(), getServices(), getSkills(), getBlogs({ limit: 3 }), getTestimonials(), getAbout(),
        ]);
        if (settingsRes.status === 'fulfilled') setSettings(settingsRes.value.data);
        if (servicesRes.status === 'fulfilled') setServices(servicesRes.value.data);
        if (skillsRes.status === 'fulfilled') setSkills(skillsRes.value.data);
        if (blogsRes.status === 'fulfilled') setBlogs(blogsRes.value.data.blogs || []);
        if (testimonialsRes.status === 'fulfilled') setTestimonials(testimonialsRes.value.data);
        if (aboutRes.status === 'fulfilled') setAbout(aboutRes.value.data);
      } catch {}
      setLoading(false);
    };
    fetchData();
  }, []);

  const expertise = ['Tax Preparation', 'Bookkeeping', 'GST Filing', 'Accounts Receivable', 'Financial Reporting', 'Payroll Services'];

  return (
    <>
      <SEO title="Home" description="Jasmin Paito — Professional Accounting Assistant specializing in tax preparation, bookkeeping, and financial consulting." />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center bg-navy overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-royal/[0.04] rounded-full blur-[120px]" />
          <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-gold/[0.03] rounded-full blur-[100px]" />
          {/* Grid */}
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Content */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-emerald/10 border border-emerald/20 text-emerald text-sm font-medium px-5 py-2.5 rounded-full mb-8">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald"></span>
                </span>
                Available for Opportunities
              </motion.div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif" }}>
                {settings?.heroTitle || 'Jasmin Paito'}
              </h1>

              <div className="h-1.5 w-24 bg-gradient-to-r from-emerald to-emerald-light rounded-full mb-6" />

              <h2 className="text-xl md:text-2xl text-emerald-light font-medium mb-6" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {settings?.heroSubtitle || 'Accounting Assistant | Tax, Bookkeeping & Administrative Support'}
              </h2>

              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
                {about?.biography
                  ? about.biography.substring(0, 180) + '...'
                  : 'Experienced Accounting Assistant with expertise in tax preparation, bookkeeping, accounts receivable, GST filings, and administrative support.'}
              </p>

              {/* Expertise pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {expertise.map((item) => (
                  <span key={item} className="text-xs text-gray-300 bg-white/[0.05] border border-white/10 px-3 py-1.5 rounded-full">
                    {item}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 mb-10">
                <Link to="/services" className="btn-primary text-base">
                  View My Services <FiArrowRight />
                </Link>
                <Link to="/contact" className="btn-secondary text-base">
                  Get In Touch
                </Link>
                {about?.resumeUrl && (
                  <>
                    <a href={getResumeViewUrl(about.resumeUrl)} target="_blank" rel="noopener noreferrer" className="btn-secondary text-base flex items-center gap-2">
                      <FiFileText /> View Resume
                    </a>
                    <a href={getResumeDownloadUrl(about.resumeUrl)} download="Jasmin_Paito_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary text-base flex items-center gap-2 bg-white/[0.05] border-white/10 hover:bg-emerald hover:border-emerald hover:text-white">
                      <FiFileText /> Download
                    </a>
                  </>
                )}
              </div>

              {/* Social */}
              <div className="flex items-center gap-5">
                <span className="!text-gray-400 text-sm font-medium">Connect</span>
                <div className="h-px w-8 bg-gray-700" />
                {settings?.socialLinks?.linkedin && (
                  <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 bg-white/[0.08] border border-white/20 rounded-xl flex items-center justify-center !text-white hover:!bg-[#0077B5] hover:border-[#0077B5] transition-all duration-300 shadow-sm shadow-black/20">
                    <FiLinkedin size={20} />
                  </a>
                )}
                {settings?.socialLinks?.facebook && (
                  <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 bg-white/[0.08] border border-white/20 rounded-xl flex items-center justify-center !text-white hover:!bg-[#1877F2] hover:border-[#1877F2] transition-all duration-300 shadow-sm shadow-black/20">
                    <FiFacebook size={20} />
                  </a>
                )}
                {settings?.socialLinks?.twitter && (
                  <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 bg-white/[0.08] border border-white/20 rounded-xl flex items-center justify-center !text-white hover:!bg-[#1DA1F2] hover:border-[#1DA1F2] transition-all duration-300 shadow-sm shadow-black/20">
                    <FiTwitter size={20} />
                  </a>
                )}
                {settings?.socialLinks?.instagram && (
                  <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                    className="w-11 h-11 bg-white/[0.08] border border-white/20 rounded-xl flex items-center justify-center !text-white hover:!bg-[#E4405F] hover:border-[#E4405F] transition-all duration-300 shadow-sm shadow-black/20">
                    <FiInstagram size={20} />
                  </a>
                )}
                <a href={`mailto:${settings?.contactInfo?.email || 'jasminpaito11@gmail.com'}`}
                  className="w-11 h-11 bg-white/[0.08] border border-white/20 rounded-xl flex items-center justify-center !text-white hover:!bg-emerald hover:border-emerald transition-all duration-300 shadow-sm shadow-black/20">
                  <FiMail size={20} />
                </a>
              </div>
            </motion.div>

            {/* Right - Professional graphic */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:flex justify-center relative">
              <div className="relative w-[420px] h-[420px]">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-2 border-emerald/10 animate-pulse-glow" />
                <div className="absolute inset-4 rounded-full border border-emerald/5" />
                {/* Center circle */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-navy-light to-navy border border-emerald/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-7xl mb-4">📊</div>
                    <div className="text-emerald font-bold text-lg tracking-wide" style={{ fontFamily: "'Outfit', sans-serif" }}>Accounting</div>
                    <div className="text-gray-500 text-sm">Professional</div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-2 right-4 glass-card !p-3 !px-4 flex items-center gap-2 text-white text-sm font-medium">
                  <span className="text-base">📋</span> Tax Specialist
                </motion.div>
                <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-8 -left-4 glass-card !p-3 !px-4 flex items-center gap-2 text-white text-sm font-medium">
                  <span className="text-base">💼</span> Financial Expert
                </motion.div>
                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                  className="absolute top-1/2 -right-6 glass-card !p-3 !px-4 flex items-center gap-2 text-emerald text-sm font-semibold">
                  <FiCheckCircle size={16} /> CPA Ready
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-dark to-transparent" />
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-navy-dark py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald/[0.03] via-transparent to-royal/[0.03]" />
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <StatsCounter value="150" suffix="+" label="Tax Returns Prepared" />
            <StatsCounter value="350" suffix="+" label="Clients Served" />
            <StatsCounter value="3" suffix="+" label="Years Experience" />
            <StatsCounter value="18" suffix="+" label="Professional Skills" />
          </div>
        </div>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      <section className="section-padding bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="relative">
                <div className="w-full max-w-sm mx-auto aspect-square lg:aspect-[4/5] bg-gradient-to-br from-light-gray to-emerald/5 rounded-[2.5rem] flex items-center justify-center border border-gray-100 overflow-hidden shadow-2xl shadow-navy/10">
                  {loading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50/50">
                      <div className="w-12 h-12 border-4 border-emerald/20 border-t-emerald rounded-full animate-spin" />
                    </div>
                  ) : settings?.profileImage ? (
                    <img src={settings.profileImage} alt="Jasmin Paito" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="text-center p-8">
                      <div className="text-7xl font-bold text-emerald mb-4">JP</div>
                      <p className="text-slate-custom font-medium text-lg">Jasmin Paito</p>
                      <p className="text-slate-custom/60 text-sm">Accounting Professional</p>
                    </div>
                  )}
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald/10 rounded-2xl -z-10" />
                <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-emerald/20 rounded-2xl -z-10" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
                <span className="w-8 h-[2px] bg-emerald" /> About Me
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Professional Background
              </h2>
              <p className="text-slate-custom text-lg leading-relaxed mb-6">
                {about?.biography || 'Experienced Accounting Assistant with expertise in tax preparation, bookkeeping, accounts receivable, GST filings, and administrative support.'}
              </p>

              {/* Key highlights */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { num: '150+', label: 'T1 Returns' },
                  { num: '350+', label: 'Clients' },
                  { num: '3+', label: 'Years Exp.' },
                  { num: '8+', label: 'Services' },
                ].map((item, i) => (
                  <div key={i} className="bg-light-gray rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-emerald">{item.num}</div>
                    <div className="text-slate-custom text-sm">{item.label}</div>
                  </div>
                ))}
              </div>

              <Link to="/about" className="inline-flex items-center gap-2 text-emerald font-semibold text-lg hover:gap-3 transition-all group">
                Learn More About Me <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="section-padding bg-light-gray">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
              <span className="w-8 h-[2px] bg-emerald" /> What I Offer <span className="w-8 h-[2px] bg-emerald" />
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Professional Services
            </h2>
            <p className="text-slate-custom text-lg max-w-2xl mx-auto">
              Comprehensive accounting and financial services tailored to your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 8).map((service, i) => {
              const IconComp = iconMap[service.icon] || FiBriefcase;
              return (
                <motion.div key={service._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald/20 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-emerald/8 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-emerald group-hover:scale-110 transition-all duration-300">
                    <IconComp className="text-2xl text-emerald group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-emerald transition-colors">{service.title}</h3>
                  <p className="text-slate-custom text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="inline-flex items-center gap-2 text-emerald font-semibold text-lg hover:gap-3 transition-all group">
              View All Services <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section className="section-padding bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
              <span className="w-8 h-[2px] bg-emerald" /> My Expertise <span className="w-8 h-[2px] bg-emerald" />
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Key Skills
            </h2>
            <p className="text-slate-custom text-lg max-w-2xl mx-auto">
              Proficiency across accounting tools and professional competencies.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-6">
            {skills.slice(0, 8).map((skill, i) => (
              <motion.div key={skill._id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-navy text-sm">{skill.name}</span>
                  <span className="text-emerald font-bold text-sm">{skill.percentage}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.08, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-emerald to-emerald-light rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/skills" className="inline-flex items-center gap-2 text-emerald font-semibold hover:gap-3 transition-all group">
              View All Skills <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-navy relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald/[0.03] rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/[0.03] rounded-full blur-[100px]" />
          </div>
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
                <span className="w-8 h-[2px] bg-emerald" /> Client Feedback <span className="w-8 h-[2px] bg-emerald" />
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                What People Say
              </h2>
              <p className="text-gray-400 text-lg">Trusted by professionals and businesses alike.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div key={t._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/[0.08] transition-all duration-300"
                >
                  <FaQuoteLeft className="text-emerald/20 text-3xl mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[1,2,3,4,5].map(s => (
                      <FaStar key={s} className={s <= t.rating ? 'text-gold' : 'text-gray-600'} size={14} />
                    ))}
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-6 italic text-[0.95rem]">"{t.feedback}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="w-11 h-11 bg-emerald/15 rounded-full flex items-center justify-center">
                      <span className="text-emerald font-bold text-sm">{getInitials(t.clientName)}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{t.clientName}</h4>
                      {t.company && <p className="text-gray-500 text-xs">{t.company}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===== BLOG ===== */}
      {blogs.length > 0 && (
        <section className="section-padding bg-white">
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
                <span className="w-8 h-[2px] bg-emerald" /> Latest Insights <span className="w-8 h-[2px] bg-emerald" />
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                From the Blog
              </h2>
              <p className="text-slate-custom text-lg">Tips and insights on accounting, tax, and finance.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {blogs.slice(0, 3).map((blog, i) => (
                <motion.div key={blog._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-52 bg-gradient-to-br from-navy to-navy-light relative overflow-hidden">
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-navy via-navy-light to-emerald/20">
                        <span className="text-6xl opacity-20">📊</span>
                      </div>
                    )}
                    {blog.category && (
                      <span className="absolute top-4 left-4 bg-emerald text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {blog.category}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-slate-custom mb-3">
                      <span>{formatDate(blog.createdAt)}</span>
                      <span>• {blog.readingTime} min read</span>
                    </div>
                    <h3 className="text-lg font-bold text-navy mb-3 group-hover:text-emerald transition-colors leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-slate-custom text-sm leading-relaxed mb-4 line-clamp-2">
                      {truncateText(blog.excerpt || blog.content?.replace(/<[^>]*>/g, ''), 100)}
                    </p>
                    <Link to={`/blog/${blog.slug}`} className="inline-flex items-center gap-2 text-emerald font-semibold text-sm group/link">
                      Read More <FiArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/blog" className="inline-flex items-center gap-2 text-emerald font-semibold text-lg hover:gap-3 transition-all group">
                View All Posts <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA ===== */}
      <section className="py-28 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/[0.04] rounded-full blur-[120px]" />
        </div>
        <div className="w-full max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-6">
              <span className="w-8 h-[2px] bg-emerald" /> Let's Work Together <span className="w-8 h-[2px] bg-emerald" />
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Ready to Get Started?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Let's discuss how I can help you with your accounting, tax preparation, and financial management needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary text-lg !px-10 !py-4">
                Contact Me <FiArrowRight />
              </Link>
              <a href="mailto:jasminpaito11@gmail.com" className="btn-secondary text-lg !px-10 !py-4">
                <FiMail /> Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
