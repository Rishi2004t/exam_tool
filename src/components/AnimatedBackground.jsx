import React, { useState, useEffect, createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const AnimatedBackground = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('edqualis-theme') || 'blue';
  });

  useEffect(() => {
    localStorage.setItem('edqualis-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <div className="edqualis-bg"></div>
      <div className="app-container">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default AnimatedBackground;
