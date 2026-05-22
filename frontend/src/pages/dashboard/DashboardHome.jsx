import { useState, useEffect } from 'react';
import { FiBriefcase, FiBarChart2, FiFileText, FiMessageSquare } from 'react-icons/fi';
import StatsCard from '../../components/dashboard/StatsCard';
import { getServices } from '../../services/serviceService';
import { getSkills } from '../../services/skillService';
import { getAllBlogs } from '../../services/blogService';
import { getAllTestimonials } from '../../services/testimonialService';
import { useAuth } from '../../context/AuthContext';

const DashboardHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ services: 0, skills: 0, blogs: 0, testimonials: 0 });

  useEffect(() => {
    const fetch = async () => {
      try {
        const [s, sk, b, t] = await Promise.allSettled([getServices(), getSkills(), getAllBlogs(), getAllTestimonials()]);
        setStats({
          services: s.status === 'fulfilled' ? s.value.data.length : 0,
          skills: sk.status === 'fulfilled' ? sk.value.data.length : 0,
          blogs: b.status === 'fulfilled' ? b.value.data.length : 0,
          testimonials: t.status === 'fulfilled' ? t.value.data.length : 0,
        });
      } catch {}
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-navy mb-1">Welcome back, {user?.name}! 👋</h1>
        <p className="text-slate-custom">Here's an overview of your portfolio.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard title="Services" value={stats.services} icon={FiBriefcase} color="emerald" />
        <StatsCard title="Skills" value={stats.skills} icon={FiBarChart2} color="royal" />
        <StatsCard title="Blog Posts" value={stats.blogs} icon={FiFileText} color="gold" />
        <StatsCard title="Testimonials" value={stats.testimonials} icon={FiMessageSquare} color="navy" />
      </div>
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-lg font-bold text-navy mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Add Service', path: '/dashboard/services', icon: '💼' },
            { label: 'Add Skill', path: '/dashboard/skills', icon: '📊' },
            { label: 'Write Blog', path: '/dashboard/blogs', icon: '✍️' },
            { label: 'Site Settings', path: '/dashboard/settings', icon: '⚙️' },
          ].map(action => (
            <a key={action.label} href={action.path} className="flex flex-col items-center p-4 rounded-xl border border-gray-100 hover:border-emerald/30 hover:shadow-md transition-all group">
              <span className="text-2xl mb-2">{action.icon}</span>
              <span className="text-sm font-medium text-navy group-hover:text-emerald transition-colors">{action.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
