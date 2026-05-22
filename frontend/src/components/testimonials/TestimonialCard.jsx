import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { getInitials } from '../../utils/helpers';

const TestimonialCard = ({ testimonial, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="bg-white rounded-2xl p-8 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 relative"
    >
      <FaQuoteLeft className="text-emerald/15 text-4xl absolute top-6 right-6" />

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <FiStar key={i} className={`${i < testimonial.rating ? 'text-gold fill-gold' : 'text-gray-300'}`} size={16} />
        ))}
      </div>

      {/* Feedback */}
      <p className="text-slate-custom leading-relaxed mb-6 italic">"{testimonial.feedback}"</p>

      {/* Client */}
      <div className="flex items-center gap-3">
        {testimonial.image ? (
          <img src={testimonial.image} alt={testimonial.clientName} className="w-12 h-12 rounded-full object-cover" />
        ) : (
          <div className="w-12 h-12 bg-emerald/10 rounded-full flex items-center justify-center">
            <span className="text-emerald font-bold">{getInitials(testimonial.clientName)}</span>
          </div>
        )}
        <div>
          <h4 className="font-semibold text-navy">{testimonial.clientName}</h4>
          {testimonial.company && <p className="text-slate-custom text-sm">{testimonial.company}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default TestimonialCard;
