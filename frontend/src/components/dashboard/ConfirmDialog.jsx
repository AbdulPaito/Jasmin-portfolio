import { motion, AnimatePresence } from 'framer-motion';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, message = 'Are you sure?', loading = false }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={onClose} className="absolute inset-0 bg-black/50" />
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 z-10 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-xl font-bold text-navy mb-2">Confirm Delete</h3>
          <p className="text-slate-custom mb-8">{message}</p>
          <div className="flex gap-3 justify-center">
            <button onClick={onClose} className="px-6 py-2.5 rounded-lg border border-gray-200 text-slate-custom hover:bg-gray-50 font-medium transition-colors">Cancel</button>
            <button onClick={onConfirm} disabled={loading} className="px-6 py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 font-medium transition-colors flex items-center gap-2">
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : 'Delete'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmDialog;
