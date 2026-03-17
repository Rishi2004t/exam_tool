import React, { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const AnimatedBackground = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('edqualis-theme') || 'blue';
  });

  const [mode, setMode] = useState(() => {
    return localStorage.getItem('edqualis-mode') || 'dark';
  });

  const [background, setBackground] = useState(() => {
    return localStorage.getItem('edqualis-background') || 'blue-gradient';
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('edqualis-theme', theme);
    localStorage.setItem('edqualis-mode', mode);
    localStorage.setItem('edqualis-background', background);
    
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-mode', mode);
    document.documentElement.setAttribute('data-background', background);
  }, [theme, mode, background]);

  const updateTheme = (newTheme) => setTheme(newTheme);
  const updateMode = (newMode) => setMode(newMode);
  const updateBackground = (newBg) => setBackground(newBg);

  const resetSettings = () => {
    setTheme('blue');
    setMode('dark');
    setBackground('blue-gradient');
    setSearchTerm('');
    localStorage.removeItem('edqualis-theme');
    localStorage.removeItem('edqualis-mode');
    localStorage.removeItem('edqualis-background');
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, updateTheme, 
      mode, updateMode, 
      background, updateBackground,
      searchTerm, setSearchTerm,
      resetSettings 
    }}>
      <div className={`edqualis-bg bg-${background}`}></div>
      {children}
    </ThemeContext.Provider>
  );
};

export default AnimatedBackground;
