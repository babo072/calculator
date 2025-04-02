'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Theme } from '../types/calculator';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setThemeByResult: (result: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // 시간대에 따라 초기 테마 설정
  useEffect(() => {
    const hours = new Date().getHours();
    if (hours >= 6 && hours < 18) {
      setTheme('morning');
    } else {
      setTheme('evening');
    }
  }, []);

  // 시스템 테마 변경 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === 'light' || prevTheme === 'morning') {
        return 'dark';
      } else if (prevTheme === 'dark' || prevTheme === 'evening') {
        return 'light';
      }
      return 'light';
    });
  };

  // 계산 결과에 따라 테마 변경
  const setThemeByResult = (result: number) => {
    if (result > 100) {
      setTheme('result');
    } else if (result < 0) {
      setTheme('dark');
    } else {
      const hours = new Date().getHours();
      if (hours >= 6 && hours < 18) {
        setTheme('morning');
      } else {
        setTheme('evening');
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, setThemeByResult }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 