import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const StatsCounter = ({ value, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = parseInt(value);
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count}<span className="text-emerald">{suffix}</span>
      </div>
      <p className="text-gray-400 text-sm">{label}</p>
    </motion.div>
  );
};

export default StatsCounter;
