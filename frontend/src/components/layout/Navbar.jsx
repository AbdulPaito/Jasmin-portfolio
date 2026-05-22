import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Skills', path: '/skills' },
  { name: 'Blog', path: '/blog' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [location]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f1b2d]/95 backdrop-blur-xl shadow-2xl border-b border-white/5'
          : 'bg-[#0f1b2d]/85 backdrop-blur-md'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group !no-underline">
            <div>
              <span className="!text-white font-bold text-lg block leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Jasmin Paito</span>
              <p className="!text-[#34d399] text-[10px] tracking-[0.15em] uppercase font-semibold hidden sm:block">Accounting Professional</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
              const isHome = link.path === '/' && location.pathname === '/';
              const active = isHome || isActive;

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 !no-underline ${
                    active
                      ? '!text-white bg-emerald/15 shadow-sm'
                      : '!text-gray-300 hover:!text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link to="/contact"
              className="ml-4 inline-flex items-center gap-2 bg-gradient-to-r from-emerald to-emerald-dark !text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-emerald/25 hover:shadow-emerald/40 hover:-translate-y-0.5 transition-all duration-300 !no-underline">
              Get In Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden !text-white p-2 hover:bg-white/10 rounded-lg transition-colors border-none bg-transparent cursor-pointer" aria-label="Toggle menu">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#1a2942]/95 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                const isHome = link.path === '/' && location.pathname === '/';
                const active = isHome || isActive;

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3.5 rounded-xl text-sm font-medium transition-all !no-underline ${
                      active
                        ? '!text-white bg-emerald/15'
                        : '!text-gray-300 hover:!text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <Link to="/contact" onClick={() => setIsOpen(false)} className="block text-center mt-4 bg-gradient-to-r from-emerald to-emerald-dark !text-white font-semibold py-3.5 rounded-xl shadow-lg !no-underline">
                Get In Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
