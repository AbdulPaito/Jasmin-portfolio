import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const DashboardModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/50" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[85vh] overflow-y-auto z-10">
          <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
            <h2 className="text-xl font-bold text-navy">{title}</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"><FiX size={18} /></button>
          </div>
          <div className="p-6">{children}</div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DashboardModal;
