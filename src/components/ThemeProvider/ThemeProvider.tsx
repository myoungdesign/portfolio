'use client';

import { useEffect, useState, useCallback, ReactNode, createContext } from 'react';

export interface ThemeContextType {
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  theme?: 'light' | 'dark';
}

function getInitialTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function ThemeProvider({ children, theme }: ThemeProviderProps) {
  const [internalMode, setModeState] = useState(getInitialTheme);

  const mode = theme ?? internalMode;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    if (!theme) {
      localStorage.setItem('theme', mode);
      document.cookie = `theme=${mode}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [mode, theme]);

  useEffect(() => {
    if (theme) return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (!localStorage.getItem('theme')) {
        setModeState(mq.matches ? 'dark' : 'light');
      }
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const setMode = useCallback(
    (newMode: 'light' | 'dark') => {
      if (!theme) setModeState(newMode);
    },
    [theme]
  );

  const toggleMode = useCallback(() => {
    if (!theme) setModeState(m => (m === 'light' ? 'dark' : 'light'));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
export { ThemeContext };
