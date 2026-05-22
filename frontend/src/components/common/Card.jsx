import { motion } from 'framer-motion';

const Card = ({ children, glass = false, hover = true, className = '', onClick }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, boxShadow: '0 20px 40px rgba(15,27,45,0.1)' } : {}}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className={`rounded-2xl p-6 transition-all duration-300 ${
        glass
          ? 'glass'
          : 'bg-white border border-gray-100 shadow-md hover:shadow-xl'
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Card;
