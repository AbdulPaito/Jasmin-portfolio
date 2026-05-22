/**
 * HeroSection Component
 * Premium full-viewport hero with animated elements, stats, and CTAs
 */
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiLinkedin, FiMail, FiPhone, FiArrowRight, FiFileText, FiDollarSign, FiBarChart2 } from 'react-icons/fi';
import StatsCounter from './StatsCounter';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../animations/variants';

const HeroSection = ({ settings }) => {
  const stats = [
    { target: 150, suffix: '+', label: 'Tax Returns', icon: FiFileText },
    { target: 350, suffix: '+', label: 'Clients Served', icon: FiDollarSign },
    { target: 3, suffix: '+', label: 'Years Experience', icon: FiBarChart2 },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-navy-dark via-navy to-navy-light">
      {/* Animated Background Geometric Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-emerald/5 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-royal/5 blur-3xl"
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-gold/5 blur-2xl"
          animate={{ x: [0, 20, 0], y: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Geometric grid lines */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating financial icons */}
        <motion.div
          className="absolute top-32 right-1/4 text-emerald/10 text-6xl"
          animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiDollarSign />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-1/5 text-gold/10 text-5xl"
          animate={{ y: [0, 20, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiBarChart2 />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-16 text-royal/10 text-4xl"
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FiFileText />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting Badge */}
            <motion.div variants={fadeInUp} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald/10 border border-emerald/20 text-emerald text-sm font-inter font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                Welcome to My Portfolio
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeInUp}
              className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight"
            >
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald to-emerald-light">
                Jasmin Paito
              </span>
            </motion.h1>

            {/* Title */}
            <motion.p
              variants={fadeInUp}
              className="font-outfit text-lg sm:text-xl text-gold mb-6 font-medium"
            >
              Accounting Assistant | Tax, Bookkeeping &amp; Administrative Support
            </motion.p>

            {/* Summary */}
            <motion.p
              variants={fadeInUp}
              className="font-inter text-slate-custom text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            >
              Experienced Accounting Assistant with expertise in tax preparation, bookkeeping,
              accounts receivable, GST filings, and administrative support. Skilled in Sage,
              QuickBooks, Xero, TaxCycle, CaseWare, and Microsoft Excel.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-10">
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald to-emerald-light text-white font-inter font-semibold rounded-xl shadow-lg shadow-emerald/25 hover:shadow-emerald/40 hover:scale-105 transition-all duration-300"
              >
                View My Services
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/20 text-white font-inter font-semibold rounded-xl hover:bg-white/5 hover:border-white/40 hover:scale-105 transition-all duration-300"
              >
                Get In Touch
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={fadeInUp} className="flex items-center gap-4">
              <span className="text-slate-custom text-sm font-inter mr-2">Connect:</span>
              <a
                href="https://linkedin.com/in/jasminpaito"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-emerald/20 hover:border-emerald/30 hover:text-emerald transition-all duration-300"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:jasminpaito11@gmail.com"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-emerald/20 hover:border-emerald/30 hover:text-emerald transition-all duration-300"
              >
                <FiMail className="w-5 h-5" />
              </a>
              <a
                href="tel:403-671-9479"
                className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-emerald/20 hover:border-emerald/30 hover:text-emerald transition-all duration-300"
              >
                <FiPhone className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Profile Visual + Decorative */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex justify-center items-center relative"
          >
            {/* Decorative rings */}
            <motion.div
              className="absolute w-[420px] h-[420px] rounded-full border border-emerald/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-[360px] h-[360px] rounded-full border border-gold/10"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full border border-royal/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />

            {/* Center profile placeholder */}
            <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-emerald/20 to-royal/20 border-2 border-white/10 flex items-center justify-center backdrop-blur-sm">
              <span className="font-playfair text-6xl font-bold text-white/80">JP</span>
              {/* Glowing dot */}
              <div className="absolute -top-2 right-4 w-4 h-4 rounded-full bg-emerald shadow-lg shadow-emerald/50 animate-pulse" />
            </div>

            {/* Floating skill badges */}
            <motion.div
              className="absolute top-8 right-8 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-sm text-white font-inter"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              🧮 Tax Expert
            </motion.div>
            <motion.div
              className="absolute bottom-16 left-4 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-sm text-white font-inter"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              📊 QuickBooks Pro
            </motion.div>
            <motion.div
              className="absolute bottom-8 right-16 px-4 py-2 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-sm text-white font-inter"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              📋 CPA Ready
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {stats.map((stat, index) => (
            <div key={index} className="relative">
              <StatsCounter
                target={stat.target}
                suffix={stat.suffix}
                label={stat.label}
                icon={stat.icon}
              />
              {/* Divider (not after last) */}
              {index < stats.length - 1 && (
                <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-white/10" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-light-gray to-transparent" />
    </section>
  );
};

export default HeroSection;
