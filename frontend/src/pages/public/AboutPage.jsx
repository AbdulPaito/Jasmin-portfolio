import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiAward, FiBriefcase, FiBookOpen, FiFileText } from 'react-icons/fi';
import SEO from '../../components/common/SEO';
import { getAbout } from '../../services/aboutService';
import { getSettings } from '../../services/settingsService';
import { getResumeViewUrl, getResumeDownloadUrl } from '../../utils/helpers';

const AboutPage = () => {
  const [about, setAbout] = useState(null);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAbout(), getSettings()])
      .then(([aboutRes, settingsRes]) => {
        setAbout(aboutRes.data);
        setSettings(settingsRes.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="About" description="Learn about Jasmin Paito's professional background in accounting." />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/[0.04] rounded-full blur-[120px]" />
        </div>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
              <span className="w-8 h-[2px] bg-emerald" /> Get To Know Me <span className="w-8 h-[2px] bg-emerald" />
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              About Me
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Dedicated accounting professional with a passion for accuracy and excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-32"><div className="loader-spinner" /></div>
      ) : (
        <>
          {/* Biography */}
          <section className="section-padding bg-white">
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <div className="relative">
                    <div className="w-full max-w-sm mx-auto aspect-square lg:aspect-[4/5] bg-gradient-to-br from-light-gray to-emerald/5 rounded-[2.5rem] flex items-center justify-center border border-gray-100 shadow-xl shadow-navy/5 overflow-hidden">
                      {settings?.profileImage ? (
                        <img src={settings.profileImage} alt="Jasmin Paito" className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="text-center p-8">
                          <div className="text-7xl font-bold text-emerald mb-4">JP</div>
                          <p className="text-navy font-bold text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>Jasmin Paito</p>
                          <p className="text-slate-custom text-sm mt-1">Accounting Professional</p>
                        </div>
                      )}
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-emerald/10 rounded-2xl -z-10" />
                    <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-emerald/20 rounded-2xl -z-10" />
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
                    <span className="w-8 h-[2px] bg-emerald" /> My Story
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Professional Journey
                  </h2>
                  <p className="text-slate-custom text-lg leading-relaxed mb-8">
                    {about?.biography || 'Experienced Accounting Assistant with expertise in tax preparation, bookkeeping, accounts receivable, GST filings, and administrative support.'}
                  </p>

                  {about?.resumeUrl && (
                    <div className="pt-2 flex flex-wrap gap-4">
                      <a href={getResumeViewUrl(about.resumeUrl)} target="_blank" rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald text-white border border-emerald hover:bg-emerald-dark font-semibold transition-all duration-300 shadow-sm hover:-translate-y-1">
                        <FiFileText size={18} /> View Resume
                      </a>
                      <a href={getResumeDownloadUrl(about.resumeUrl)} download target="_blank" rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald/10 text-emerald border border-emerald/20 hover:bg-emerald hover:text-white font-semibold transition-all duration-300 shadow-sm hover:shadow-emerald/25 hover:-translate-y-1">
                        <FiFileText size={18} /> Download Resume
                      </a>
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </section>

          {/* Experience Timeline */}
          {about?.experience?.length > 0 && (
            <section className="section-padding bg-light-gray">
              <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-16">
                  <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
                    <span className="w-8 h-[2px] bg-emerald" /> Career Path <span className="w-8 h-[2px] bg-emerald" />
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Work Experience
                  </h2>
                </div>

                <div className="max-w-4xl mx-auto space-y-8">
                  {about.experience.map((exp, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg hover:border-emerald/20 transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-6">
                        <div className="w-14 h-14 bg-emerald/10 rounded-2xl flex items-center justify-center shrink-0">
                          <FiBriefcase className="text-emerald text-2xl" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                            <h3 className="text-xl font-bold text-navy">{exp.title}</h3>
                            <span className="inline-flex items-center gap-1.5 text-emerald text-sm font-medium bg-emerald/10 px-3 py-1 rounded-full mt-2 md:mt-0 w-fit">
                              <FiCalendar size={13} /> {exp.duration}
                            </span>
                          </div>
                          <p className="text-slate-custom font-medium mb-3">{exp.company}</p>
                          <p className="text-slate-custom leading-relaxed text-[0.95rem]">{exp.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Education */}
          {about?.education?.length > 0 && (
            <section className="section-padding bg-white">
              <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-16">
                  <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
                    <span className="w-8 h-[2px] bg-emerald" /> Education <span className="w-8 h-[2px] bg-emerald" />
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-navy" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Academic Background
                  </h2>
                </div>

                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                  {about.education.map((edu, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      className="bg-light-gray rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all group">
                      <div className="w-12 h-12 bg-royal/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-royal group-hover:scale-110 transition-all">
                        <FiBookOpen className="text-royal text-xl group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="text-lg font-bold text-navy mb-2">{edu.degree}</h3>
                      <p className="text-slate-custom text-sm mb-1">{edu.institution}</p>
                      <span className="text-emerald font-semibold text-sm">{edu.year}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Achievements */}
          {about?.achievements?.length > 0 && (
            <section className="section-padding bg-navy">
              <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="text-center mb-16">
                  <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
                    <span className="w-8 h-[2px] bg-emerald" /> Milestones <span className="w-8 h-[2px] bg-emerald" />
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                    Key Achievements
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {about.achievements.map((a, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/[0.08] transition-all">
                      <div className="w-16 h-16 bg-emerald/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <FiAward className="text-emerald text-3xl" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">{a.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{a.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
};

export default AboutPage;
