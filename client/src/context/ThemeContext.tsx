import { createContext, useState } from 'react';

import { ThemeProvider } from 'styled-components';

import { darkTheme, GlobalStyles, lightTheme } from '@/config/theme';

interface ThemeContextProps {
  isDarkMode: boolean;
  handleToggle: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: true,
  handleToggle: () => null,
});

const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, handleToggle }}>
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default CustomThemeProvider;
