import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, color = 'emerald' }) => {
  const colors = {
    emerald: 'bg-emerald/10 text-emerald',
    royal: 'bg-royal/10 text-royal',
    gold: 'bg-amber-100 text-amber-600',
    navy: 'bg-navy/10 text-navy',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-custom text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-navy">{value}</p>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colors[color]}`}>
          <Icon size={22} />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
