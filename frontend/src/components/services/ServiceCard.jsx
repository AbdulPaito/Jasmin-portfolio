import { motion } from 'framer-motion';
import { FiFileText, FiBook, FiDollarSign, FiClipboard, FiBarChart2, FiUsers, FiSearch, FiBriefcase } from 'react-icons/fi';

const iconMap = {
  FiFileText, FiBook, FiDollarSign, FiClipboard, FiBarChart2, FiUsers, FiSearch, FiBriefcase,
};

const ServiceCard = ({ title, description, icon, index = 0 }) => {
  const IconComponent = iconMap[icon] || FiBriefcase;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(15,27,45,0.12)' }}
      className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md group transition-all duration-300 hover:border-emerald/20"
    >
      <div className="w-14 h-14 bg-emerald/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald group-hover:text-white transition-all duration-300">
        <IconComponent className="text-2xl text-emerald group-hover:text-white transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
      <p className="text-slate-custom text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;
