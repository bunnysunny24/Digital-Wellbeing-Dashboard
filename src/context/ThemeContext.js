import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { loadSettings, saveSettings } from '../utils/storageUtils';

// Define our light and dark themes
const lightTheme = {
  mode: 'light',
  colors: {
    background: '#F5F5F7',
    card: '#FFFFFF',
    text: '#333333',
    textSecondary: '#666666',
    textTertiary: '#999999',
    accent: '#5A78FF',
    accentLight: 'rgba(90, 120, 255, 0.2)',
    border: '#F0F0F0',
    shadow: 'rgba(0, 0, 0, 0.1)',
    success: '#4CAF50',
    warning: '#FFA26B',
    error: '#FF6B6B',
    inactiveTab: '#9E9E9E',
    chartBar: '#5A78FF',
    inputBackground: '#F5F5F5',
    statusBar: 'dark-content',
  }
};

const darkTheme = {
  mode: 'dark',
  colors: {
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    textTertiary: '#999999',
    accent: '#738AFF',
    accentLight: 'rgba(115, 138, 255, 0.2)',
    border: '#333333',
    shadow: 'rgba(0, 0, 0, 0.3)',
    success: '#66BB6A',
    warning: '#FFAC71',
    error: '#FF7676',
    inactiveTab: '#777777',
    chartBar: '#738AFF',
    inputBackground: '#2A2A2A',
    statusBar: 'light-content',
  }
};

// Create the context
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Provider component
export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  const [themeMode, setThemeMode] = useState('system'); // 'light', 'dark', or 'system'
  
  // Load saved theme settings
  useEffect(() => {
    const loadThemeSettings = async () => {
      try {
        const settings = await loadSettings();
        if (settings && settings.themeMode) {
          setThemeMode(settings.themeMode);
        }
      } catch (error) {
        console.log('Theme settings load failed, using defaults');
        // Continue with default theme
      }
    };
    
    loadThemeSettings();
  }, []);
  
  // Update theme based on mode
  useEffect(() => {
    let newTheme;
    
    switch (themeMode) {
      case 'dark':
        newTheme = darkTheme;
        break;
      case 'light':
        newTheme = lightTheme;
        break;
      case 'system':
      default:
        newTheme = systemColorScheme === 'dark' ? darkTheme : lightTheme;
        break;
    }
    
    setCurrentTheme(newTheme);
  }, [themeMode, systemColorScheme]);
  
  // Toggle between light and dark themes
  const toggleTheme = async () => {
    const newThemeMode = currentTheme.mode === 'light' ? 'dark' : 'light';
    setThemeMode(newThemeMode);
    
    // Save the setting
    try {
      const settings = await loadSettings();
      await saveSettings({ ...settings, themeMode: newThemeMode });
    } catch (error) {
      console.error('Failed to save theme settings:', error);
    }
  };
  
  // Set a specific theme mode
  const setTheme = async (mode) => {
    if (['light', 'dark', 'system'].includes(mode)) {
      setThemeMode(mode);
      
      // Save the setting
      try {
        const settings = await loadSettings();
        await saveSettings({ ...settings, themeMode: mode });
      } catch (error) {
        console.error('Failed to save theme settings:', error);
      }
    }
  };
  
  const value = {
    theme: currentTheme,
    themeMode,
    isDark: currentTheme.mode === 'dark',
    toggleTheme,
    setTheme,
  };
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;