import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
import useScrollToTop from '../../hooks/useScrollToTop';

const PublicLayout = () => {
  useScrollToTop();
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default PublicLayout;
