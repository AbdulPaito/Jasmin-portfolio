import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiArrowRight, FiFacebook, FiTwitter, FiInstagram } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { getSettings } from '../../services/settingsService';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSettings().then(r => setSettings(r.data)).catch(() => {});
  }, []);

  const currentYear = new Date().getFullYear();
  const email = settings?.contactInfo?.email || 'jasminpaito11@gmail.com';
  const phone = settings?.contactInfo?.phone || '403-671-9479';
  const cleanPhone = phone.replace(/\D/g, '');
  const whatsapp = settings?.contactInfo?.whatsapp?.replace(/\D/g, '') || cleanPhone || '14036719479';
  
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Skills', path: '/skills' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const services = [
    'Tax Preparation', 'Bookkeeping', 'GST Filing',
    'Financial Reporting', 'Payroll Services', 'Audit Assistance',
  ];

  return (
    <footer className="bg-navy-dark text-white">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-emerald via-royal to-gold" />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-bold text-xl text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Jasmin Paito</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Professional Accounting Assistant specializing in tax preparation, bookkeeping, and administrative support.
            </p>
            <div className="flex flex-wrap gap-3">
              {settings?.socialLinks?.linkedin && (
                <a href={settings.socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-[#0077B5] transition-all duration-300 hover:scale-110">
                  <FiLinkedin size={18} />
                </a>
              )}
              {settings?.socialLinks?.facebook && (
                <a href={settings.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-[#1877F2] transition-all duration-300 hover:scale-110">
                  <FiFacebook size={18} />
                </a>
              )}
              {settings?.socialLinks?.twitter && (
                <a href={settings.socialLinks.twitter} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-[#1DA1F2] transition-all duration-300 hover:scale-110">
                  <FiTwitter size={18} />
                </a>
              )}
              {settings?.socialLinks?.instagram && (
                <a href={settings.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-[#E4405F] transition-all duration-300 hover:scale-110">
                  <FiInstagram size={18} />
                </a>
              )}
              <a href={`mailto:${email}`}
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-emerald transition-all duration-300 hover:scale-110">
                <FiMail size={18} />
              </a>
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white hover:bg-green-500 transition-all duration-300 hover:scale-110">
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-400 hover:text-emerald transition-colors flex items-center gap-2 text-sm group">
                    <FiArrowRight className="text-xs text-emerald/40 group-hover:text-emerald group-hover:translate-x-1 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <Link to="/services" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-400 hover:text-emerald transition-colors flex items-center gap-2 text-sm group">
                    <FiArrowRight className="text-xs text-emerald/40 group-hover:text-emerald group-hover:translate-x-1 transition-all" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6 text-white">Contact Info</h4>
            <ul className="space-y-4">
              <li>
                <a href={`tel:${cleanPhone}`} className="flex items-start gap-3 group">
                  <div className="w-9 h-9 bg-emerald/10 rounded-lg flex items-center justify-center shrink-0">
                    <FiPhone className="text-emerald" size={15} />
                  </div>
                  <span className="text-gray-400 group-hover:text-white text-sm mt-1.5 transition-colors">{phone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="flex items-start gap-3 group">
                  <div className="w-9 h-9 bg-emerald/10 rounded-lg flex items-center justify-center shrink-0">
                    <FiMail className="text-emerald" size={15} />
                  </div>
                  <span className="text-gray-400 group-hover:text-white text-sm mt-1.5 transition-colors">{email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 bg-emerald/10 rounded-lg flex items-center justify-center shrink-0">
                  <FiMapPin className="text-emerald" size={15} />
                </div>
                <span className="text-gray-400 text-sm mt-1.5">{settings?.contactInfo?.address || 'Calgary, SW, Alberta'}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06]">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6 flex justify-center items-center text-center">
          <p className="text-gray-500 text-sm">&copy; {currentYear} Jasmin Paito. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
