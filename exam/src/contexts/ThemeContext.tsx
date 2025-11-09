import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true); 

  useEffect(() => {
    const saved = localStorage.getItem('darkMode');
    const htmlElement = document.documentElement;
    
    if (saved !== null) {
      const savedMode = JSON.parse(saved);
      setDarkMode(savedMode);
      // Apply to html element for Tailwind dark mode
      if (savedMode) {
        htmlElement.classList.add('dark');
        htmlElement.setAttribute('data-theme', 'dark');
      } else {
        htmlElement.classList.remove('dark');
        htmlElement.setAttribute('data-theme', 'light');
      }
    } else {
      // Default to dark mode
      htmlElement.classList.add('dark');
      htmlElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    
    // Apply to html element for Tailwind dark mode - use requestAnimationFrame for better timing
    requestAnimationFrame(() => {
      const htmlElement = document.documentElement;
      if (newMode) {
        htmlElement.classList.add('dark');
        htmlElement.setAttribute('data-theme', 'dark');
      } else {
        htmlElement.classList.remove('dark');
        htmlElement.setAttribute('data-theme', 'light');
      }
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};