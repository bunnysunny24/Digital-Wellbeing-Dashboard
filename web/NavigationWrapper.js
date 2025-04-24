import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// Web-specific wrapper for React Navigation
export function WebNavigationWrapper({ children }) {
  return (
    <NavigationContainer>
      {children}
    </NavigationContainer>
  );
}