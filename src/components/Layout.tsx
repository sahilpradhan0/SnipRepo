import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import { DashboardNav } from './DashboardNav';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { Analytics } from './analytics/Analytics';
import { KeyboardShortcuts } from './KeyboardShortcuts';
import { SnippetWithTags } from '../lib/api/snippets';

interface LayoutProps {
  children: React.ReactNode;
  hasOpenModal?: boolean;
  hideImportExport?: boolean;
  onShowImportExport?: () => void; // Added this prop
}

export function Layout({ children, hasOpenModal = false, hideImportExport = false, onShowImportExport = () => {} }: LayoutProps) {
  const { user, signOut } = useAuth();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useKeyboardShortcuts({
    onToggleTheme: toggleTheme,
    onHelp: () => setShowKeyboardShortcuts(true),
  });

  const isAnyNavModalOpen = showAnalytics || showKeyboardShortcuts; // showImportExport is now managed by Dashboard

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors ${hasOpenModal || isAnyNavModalOpen ? 'fixed inset-0 overflow-hidden' : ''}`}>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: 'dark:bg-gray-700 dark:text-white',
        }}
      />
      <DashboardNav
        userEmail={user?.email}
        onSignOut={signOut}
        onShowImportExport={onShowImportExport} // Pass the prop down
        onShowAnalytics={() => setShowAnalytics(true)}
        onShowKeyboardShortcuts={() => setShowKeyboardShortcuts(true)}
        onUpgrade={() => { /* Logic to show pricing modal can be added here */ }}
        theme={theme}
        onToggleTheme={toggleTheme}
        hideImportExport={hideImportExport}
      />

      {children}

      {showAnalytics && (
        <Analytics onClose={() => setShowAnalytics(false)} />
      )}

      {showKeyboardShortcuts && (
        <KeyboardShortcuts onClose={() => setShowKeyboardShortcuts(false)} />
      )}
    </div>
  );
}