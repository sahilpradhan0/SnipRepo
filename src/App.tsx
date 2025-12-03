import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthPage } from './components/auth/AuthPage';
import { Dashboard } from './components/Dashboard';
import { ResetPasswordPage } from './components/auth/ResetPasswordPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';
import { LandingPage } from './components/landing/LandingPage';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ReactLenis } from 'lenis/react'
import { Toaster } from 'react-hot-toast';
import { SnippetDetail } from './components/snippets/SnippetDetail';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { AllSnippetsPage } from './components/AllSnippetsPage';
import { About } from './components/landing/About';
import { Contact } from './components/landing/Contact';
import RefundCancellation from './components/landing/RefundCancellation';
import TermsOfService from './components/landing/TermsOfService';
import PrivacyPolicy from './components/landing/PrivacyPolicy';
import PageNotFound from './components/landing/PageNotFound';
import posthog from 'posthog-js';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Analytics } from './components/analytics/Analytics';
import { CodeSnippetManager } from './components/landing/seopages/CodeSnippetManager';
import { CodeSnippetStorage } from './components/landing/seopages/CodeSnippetStorage';
import BestCodeSnippetManager from './components/landing/seopages/BestCodeSnippetManager';
import AICodeSnippetSearch from './components/landing/seopages/AICodeSnippetSearch';
import SnipRepoVsGist from './components/landing/seopages/SnipRepoVsGist';
import SnipRepoVsNotion from './components/landing/seopages/SnipRepoVsNotion';
import CodeSnippetManagement from './components/landing/seopages/CodeSnippetManagement';

function AppContent() {
  const { user, loading, isRecoveringPassword } = useAuth();
  const location = useLocation();

  useEffect(() => {
    posthog.capture('$pageview');
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LandingPage />} />
      <Route path="/login" element={user && !isRecoveringPassword ? <Navigate to="/dashboard" /> : <AuthPage key="login" />} />
      <Route path="/register" element={user && !isRecoveringPassword ? <Navigate to="/dashboard" /> : <AuthPage key="register" />} />
      <Route path="/forgot-password" element={user ? <Navigate to="/dashboard" /> : <ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/snippet/:id" element={<SnippetDetail />} />
        <Route path="/dashboard/snippets" element={<AllSnippetsPage />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
      </Route>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
      <Route path="/refund-cancellation" element={<RefundCancellation />} />
      <Route path="/code-snippet-manager" element={<CodeSnippetManager />} />
      <Route path="/code-snippet-storage" element={<CodeSnippetStorage />} />
      <Route path="/best-code-snippet-manager" element={<BestCodeSnippetManager />} />
      <Route path="/ai-code-snippet-search" element={<AICodeSnippetSearch />} />
      <Route path="/sniprepo-vs-gist" element={<SnipRepoVsGist />} />
      <Route path="/sniprepo-vs-notion" element={<SnipRepoVsNotion />} />
      <Route path="/code-snippet-management" element={<CodeSnippetManagement />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <SubscriptionProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              duration: 5000,
            }} />
          <ReactLenis root />
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </SubscriptionProvider>
  );
}

export default App;
