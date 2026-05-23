import { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiGrid, FiUser, FiBriefcase, FiBarChart2, FiFileText, FiMessageSquare, FiSettings, FiLogOut, FiMenu, FiX, FiMail, FiExternalLink } from 'react-icons/fi';

const sidebarLinks = [
  { name: 'Dashboard', path: '/dashboard', icon: FiGrid },
  { name: 'About', path: '/dashboard/about', icon: FiUser },
  { name: 'Services', path: '/dashboard/services', icon: FiBriefcase },
  { name: 'Skills', path: '/dashboard/skills', icon: FiBarChart2 },
  { name: 'Blogs', path: '/dashboard/blogs', icon: FiFileText },
  { name: 'Testimonials', path: '/dashboard/testimonials', icon: FiMessageSquare },
  { name: 'Messages', path: '/dashboard/messages', icon: FiMail },
  { name: 'Settings', path: '/dashboard/settings', icon: FiSettings },
];

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-light-gray flex">
      {/* Sidebar */}
      <aside className={`fixed top-0 h-screen inset-y-0 left-0 z-50 w-[260px] bg-navy transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-emerald to-emerald-dark rounded-xl flex items-center justify-center shadow-lg shadow-emerald/20">
                <span className="text-white font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>JP</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-sm">Admin Panel</h2>
                <p className="text-emerald-light text-xs font-medium">Jasmin Paito</p>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold px-4 mb-2 mt-2">Main Menu</p>
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/dashboard'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 !no-underline ${
                    isActive
                      ? 'bg-emerald/15 !text-emerald shadow-sm'
                      : '!text-gray-400 hover:!text-white hover:bg-white/[0.06]'
                  }`
                }
              >
                <link.icon size={18} />
                {link.name}
              </NavLink>
            ))}

            <div className="border-t border-white/10 mt-4 pt-4">
              <p className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold px-4 mb-2">Quick Links</p>
              <Link to="/" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium !text-gray-400 hover:!text-white hover:bg-white/[0.06] transition-all !no-underline">
                <FiExternalLink size={18} /> View Website
              </Link>
            </div>
          </nav>

          {/* User + Logout */}
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3 px-4 py-3 mb-2">
              <div className="w-9 h-9 bg-emerald/15 rounded-full flex items-center justify-center">
                <span className="text-emerald font-bold text-sm">{user?.name?.charAt(0)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{user?.name}</p>
                <p className="text-gray-500 text-xs truncate">{user?.email}</p>
              </div>
            </div>
            <button onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium !text-gray-400 hover:!text-red-400 hover:bg-red-400/10 transition-all w-full border-none bg-transparent cursor-pointer">
              <FiLogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" />}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-[260px]">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-6 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-navy hover:bg-gray-100 rounded-lg transition-colors" aria-label="Toggle sidebar">
            {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
          <div className="hidden lg:block">
            <h1 className="text-sm font-semibold text-navy">Portfolio Dashboard</h1>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <Link to="/" target="_blank" className="text-xs text-slate-custom hover:text-emerald font-medium flex items-center gap-1 transition-colors">
              <FiExternalLink size={14} /> View Site
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
