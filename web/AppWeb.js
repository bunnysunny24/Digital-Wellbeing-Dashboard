import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '../src/context/ThemeContext';

// Import screens
import DashboardScreen from '../src/screens/DashboardScreen';
import UsageDetailsScreen from '../src/screens/UsageDetailsScreen';
import GoalsScreen from '../src/screens/GoalsScreen';
import FocusModeScreen from '../src/screens/FocusModeScreen';
import SettingsScreen from '../src/screens/SettingsScreen';

const Stack = createStackNavigator();

// Web-specific wrapper for the app
const AppWeb = () => {
  // For GitHub Pages deployment
  const linking = {
    prefixes: [],
    config: {
      screens: {
        Dashboard: '',
        UsageDetails: 'usage',
        FocusMode: 'focus',
        Goals: 'goals',
        Settings: 'settings',
      },
    },
  };

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer linking={linking}>
          <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="UsageDetails" component={UsageDetailsScreen} />
            <Stack.Screen name="Goals" component={GoalsScreen} />
            <Stack.Screen name="FocusMode" component={FocusModeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default AppWeb;