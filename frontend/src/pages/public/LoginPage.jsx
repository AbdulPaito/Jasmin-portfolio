import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiLogIn, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import SEO from '../../components/common/SEO';
import toast from 'react-hot-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back, Jasmin!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <>
      <SEO title="Admin Login" />
      <div className="min-h-screen bg-navy flex items-center justify-center relative overflow-hidden px-6">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-royal/[0.04] rounded-full blur-[120px]" />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10">
          
          {/* Back link */}
          <a href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 text-sm transition-colors">
            <FiArrowLeft /> Back to website
          </a>

          <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald to-emerald-dark rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald/20">
                <span className="text-white font-bold text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>JP</span>
              </div>
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>Welcome Back</h1>
              <p className="text-gray-400 text-sm mt-2">Sign in to manage your portfolio</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full pl-12 pr-4 py-4 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald/50 focus:bg-white/[0.08] outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-4 py-4 bg-white/[0.05] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-emerald/50 focus:bg-white/[0.08] outline-none transition-all" />
                </div>
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-emerald to-emerald-dark text-white font-semibold py-4 rounded-xl shadow-lg shadow-emerald/25 hover:shadow-emerald/40 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 text-base">
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <><FiLogIn /> Sign In</>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default LoginPage;
