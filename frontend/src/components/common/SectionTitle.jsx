import { motion } from 'framer-motion';
import { fadeInUp } from '../../animations/variants';

const SectionTitle = ({ subtitle, title, description, light = false, center = true }) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`mb-16 ${center ? 'text-center' : ''}`}
    >
      {subtitle && (
        <span className="inline-flex items-center gap-3 text-emerald font-semibold uppercase tracking-widest text-sm mb-4">
          <span className="w-8 h-[2px] bg-emerald" />
          {subtitle}
          <span className="w-8 h-[2px] bg-emerald" />
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold font-playfair mb-4 ${light ? 'text-white' : 'text-navy'}`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-gray-300' : 'text-slate-custom'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
