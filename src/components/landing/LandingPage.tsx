import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { Problem } from './Problem';
import { Features } from './Features';
import { Testimonials } from './Testimonials';
import { Pricing } from './Pricing';
import { CTA } from './CTA';
import { Footer } from './Footer';

export function LandingPage() {
  const navigate = useNavigate();
  const handleGetStarted = () => navigate('/login');
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar onGetStarted={handleGetStarted} />
      <Hero onGetStarted={handleGetStarted} />
      <Problem />
      <Features />
      {/* <Testimonials /> */}
      <Pricing onGetStarted={handleGetStarted} />
      <CTA onGetStarted={handleGetStarted} />
      <Footer />
    </div>
  );
}
