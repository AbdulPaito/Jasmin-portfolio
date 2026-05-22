import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', size = 'md', loading = false, icon: Icon, onClick, className = '', type = 'button', disabled = false, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-gradient-to-r from-emerald to-emerald-dark text-white hover:shadow-lg hover:shadow-emerald/30 hover:-translate-y-0.5',
    secondary: 'bg-navy text-white hover:bg-navy-light hover:shadow-lg hover:-translate-y-0.5',
    outline: 'border-2 border-emerald text-emerald hover:bg-emerald hover:text-white hover:-translate-y-0.5',
    ghost: 'text-navy hover:bg-navy/5',
    gold: 'bg-gradient-to-r from-gold to-gold-light text-navy font-bold hover:shadow-lg hover:-translate-y-0.5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon className="text-lg" />}
          {children}
        </>
      )}
    </motion.button>
  );
};

export default Button;
