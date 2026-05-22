import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import Loader from './components/common/Loader';

// Lazy load public pages
const HomePage = lazy(() => import('./pages/public/HomePage'));
const AboutPage = lazy(() => import('./pages/public/AboutPage'));
const ServicesPage = lazy(() => import('./pages/public/ServicesPage'));
const SkillsPage = lazy(() => import('./pages/public/SkillsPage'));
const BlogPage = lazy(() => import('./pages/public/BlogPage'));
const BlogDetailPage = lazy(() => import('./pages/public/BlogDetailPage'));
const TestimonialsPage = lazy(() => import('./pages/public/TestimonialsPage'));
const ContactPage = lazy(() => import('./pages/public/ContactPage'));
const LoginPage = lazy(() => import('./pages/public/LoginPage'));

// Lazy load dashboard pages
const DashboardHome = lazy(() => import('./pages/dashboard/DashboardHome'));
const ManageAbout = lazy(() => import('./pages/dashboard/ManageAbout'));
const ManageServices = lazy(() => import('./pages/dashboard/ManageServices'));
const ManageSkills = lazy(() => import('./pages/dashboard/ManageSkills'));
const ManageBlogs = lazy(() => import('./pages/dashboard/ManageBlogs'));
const ManageTestimonials = lazy(() => import('./pages/dashboard/ManageTestimonials'));
const ManageSettings = lazy(() => import('./pages/dashboard/ManageSettings'));
const ManageMessages = lazy(() => import('./pages/dashboard/ManageMessages'));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

        {/* Login (no layout) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route index element={<DashboardHome />} />
          <Route path="about" element={<ManageAbout />} />
          <Route path="services" element={<ManageServices />} />
          <Route path="skills" element={<ManageSkills />} />
          <Route path="blogs" element={<ManageBlogs />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
          <Route path="settings" element={<ManageSettings />} />
          <Route path="messages" element={<ManageMessages />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
