import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface StaticPageLayoutProps {
  children: ReactNode;
}

export function StaticPageLayout({ children }: StaticPageLayoutProps) {
  const navigate = useNavigate();
  const handleGetStarted = () => navigate('/register');

  return (
    <>
      <Navbar onGetStarted={handleGetStarted} />
      <main>{children}</main>
      <Footer />
    </>
  );
}