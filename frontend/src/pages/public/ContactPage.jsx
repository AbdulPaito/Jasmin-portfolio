import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiLinkedin, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SEO from '../../components/common/SEO';
import { submitContact } from '../../services/contactService';
import { getSettings } from '../../services/settingsService';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSettings().then(r => setSettings(r.data)).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitContact(form);
      toast.success('Message sent successfully! Jasmin will get back to you soon.');
      setForm({ name: '', email: '', subject: '', message: '' });
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please try emailing directly.');
    }
    setSending(false);
  };

  const email = settings?.contactInfo?.email || 'jasminpaito11@gmail.com';
  const phone = settings?.contactInfo?.phone || '403-671-9479';
  const cleanPhone = phone.replace(/\D/g, '');
  const whatsapp = settings?.contactInfo?.whatsapp?.replace(/\D/g, '') || cleanPhone || '14036719479';

  const contactInfo = [
    { icon: FiPhone, label: 'Phone', value: phone, href: `tel:${cleanPhone}`, color: 'from-emerald to-emerald-dark' },
    { icon: FiMail, label: 'Email', value: email, href: `mailto:${email}`, color: 'from-royal to-royal-light' },
    { icon: FiMapPin, label: 'Location', value: settings?.contactInfo?.address || 'Calgary, SW, Alberta', href: settings?.contactInfo?.mapEmbedUrl || null, color: 'from-gold to-gold-light' },
    { icon: FaWhatsapp, label: 'WhatsApp', value: 'Message on WhatsApp', href: `https://wa.me/${whatsapp}`, color: 'from-green-500 to-green-600' },
  ];

  return (
    <>
      <SEO title="Contact" description="Get in touch with Jasmin Paito for accounting and financial services in Calgary." />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-royal/[0.04] rounded-full blur-[120px]" />
        </div>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-[0.2em] text-xs mb-4">
              <span className="w-8 h-[2px] bg-emerald" /> Let's Connect <span className="w-8 h-[2px] bg-emerald" />
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Contact Me
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Ready to streamline your finances? Send me a message and I'll get back to you promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="bg-light-gray pt-16 pb-4">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {info.href ? (
                  <a href={info.href} target={info.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                    className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl border border-gray-100 hover:border-emerald/20 transition-all duration-300 group">
                    <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <info.icon className="text-white text-xl" />
                    </div>
                    <p className="text-xs text-slate-custom uppercase tracking-wider font-medium mb-1">{info.label}</p>
                    <p className="text-navy font-semibold text-sm">{info.value}</p>
                  </a>
                ) : (
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                    <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mb-4`}>
                      <info.icon className="text-white text-xl" />
                    </div>
                    <p className="text-xs text-slate-custom uppercase tracking-wider font-medium mb-1">{info.label}</p>
                    <p className="text-navy font-semibold text-sm">{info.value}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="section-padding bg-light-gray">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form - Takes 3 cols */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-3">
              <div className="bg-white rounded-3xl p-8 md:p-10 shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-navy mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Send a Message
                </h2>
                <p className="text-slate-custom mb-8">
                  Fill out the form below and your message will be sent directly to <strong className="text-emerald">jasminpaito11@gmail.com</strong>
                </p>

                {sent ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <div className="w-20 h-20 bg-emerald/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheckCircle className="text-emerald text-4xl" />
                    </div>
                    <h3 className="text-xl font-bold text-navy mb-2">Message Sent!</h3>
                    <p className="text-slate-custom">Thank you for reaching out. Jasmin will respond as soon as possible.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">Your Name *</label>
                        <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                          placeholder="John Doe"
                          className="w-full px-5 py-4 rounded-xl bg-light-gray border border-gray-200 focus:border-emerald focus:ring-2 focus:ring-emerald/20 outline-none transition-all text-navy placeholder-gray-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-2">Your Email *</label>
                        <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                          placeholder="john@example.com"
                          className="w-full px-5 py-4 rounded-xl bg-light-gray border border-gray-200 focus:border-emerald focus:ring-2 focus:ring-emerald/20 outline-none transition-all text-navy placeholder-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Subject *</label>
                      <input type="text" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                        placeholder="e.g., Tax Return Inquiry"
                        className="w-full px-5 py-4 rounded-xl bg-light-gray border border-gray-200 focus:border-emerald focus:ring-2 focus:ring-emerald/20 outline-none transition-all text-navy placeholder-gray-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-navy mb-2">Your Message *</label>
                      <textarea rows={6} required value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                        placeholder="Tell me about your accounting needs..."
                        className="w-full px-5 py-4 rounded-xl bg-light-gray border border-gray-200 focus:border-emerald focus:ring-2 focus:ring-emerald/20 outline-none transition-all text-navy placeholder-gray-400 resize-none" />
                    </div>
                    <button type="submit" disabled={sending} className="btn-primary w-full !py-4 text-base">
                      {sending ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <><FiSend /> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Right side info - Takes 2 cols */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-2">
              <div className="bg-navy rounded-3xl p-8 md:p-10 text-white h-full">
                <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Let's Work Together
                </h2>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Whether you need help with tax preparation, bookkeeping, GST filing, or any other accounting service — I'm here to help!
                </p>

                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald/15 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <FiMail className="text-emerald" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Email</p>
                      <a href={`mailto:${email}`} className="text-white font-medium hover:text-emerald transition-colors text-sm">
                        {email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald/15 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <FiPhone className="text-emerald" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Phone</p>
                      <a href={`tel:${cleanPhone}`} className="text-white font-medium hover:text-emerald transition-colors text-sm">
                        {phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald/15 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <FiMapPin className="text-emerald" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-0.5">Location</p>
                      <p className="text-white font-medium text-sm">{settings?.contactInfo?.address || 'Calgary, SW, Alberta, Canada'}</p>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 pt-8">
                  <h3 className="font-semibold mb-4 text-sm">Connect With Me</h3>
                  <div className="flex gap-3">
                    {settings?.socialLinks?.linkedin && (
                      <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                        className="w-11 h-11 bg-white/[0.06] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-royal hover:border-royal hover:text-white transition-all">
                        <FiLinkedin size={18} />
                      </a>
                    )}
                    <a href={`mailto:${email}`}
                      className="w-11 h-11 bg-white/[0.06] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-emerald hover:border-emerald hover:text-white transition-all">
                      <FiMail size={18} />
                    </a>
                    <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
                      className="w-11 h-11 bg-white/[0.06] border border-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-green-500 hover:border-green-500 hover:text-white transition-all">
                      <FaWhatsapp size={18} />
                    </a>
                  </div>
                </div>

                {/* Response time */}
                <div className="bg-emerald/10 rounded-xl p-4 mt-8 border border-emerald/20">
                  <p className="text-emerald text-sm font-medium">⚡ Typical Response Time</p>
                  <p className="text-gray-400 text-xs mt-1">Within 24 business hours</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
