import { Outlet } from 'react-router';
import '@/styles/AppLayout.css';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

function AppLayout() {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default AppLayout;
