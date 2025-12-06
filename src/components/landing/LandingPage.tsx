import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Problem } from './Problem';
import { Features } from './Features';
import { Pricing } from './Pricing';
import { CTA } from './CTA';
import { Footer } from './Footer';
import ValueSnapshot from './ValueSnapshot';
import TrustSection from './Testimonials';

export function LandingPage() {
  const navigate = useNavigate();
  const handleGetStarted = () => navigate('/login');
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar onGetStarted={handleGetStarted} />
      <Hero onGetStarted={handleGetStarted} />
      <ValueSnapshot />
      <Problem />
      <Features />
      <TrustSection />
      <CTA onGetStarted={handleGetStarted} />
      <Pricing onGetStarted={handleGetStarted} />
      <Footer />
    </div>
  );
}
