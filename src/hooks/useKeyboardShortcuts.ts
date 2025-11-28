import { useEffect } from 'react';

interface ShortcutHandlers {
  onNew?: () => void;
  onSearch?: () => void;
  onToggleTheme?: () => void;
  onHelp?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modKey = isMac ? event.metaKey : event.ctrlKey;

      if (modKey && event.key === 'q') {
        event.preventDefault();
        handlers.onNew?.();
      }

      if (modKey && event.key === 'k') {
        event.preventDefault();
        handlers.onSearch?.();
      }

      if (modKey && event.key === 'd') {
        event.preventDefault();
        handlers.onToggleTheme?.();
      }

      if (event.key === '?' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        handlers.onHelp?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
}
