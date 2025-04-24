import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '../src/context/ThemeContext';
import { WebNavigationWrapper } from './NavigationWrapper';

// Import screens
import DashboardScreen from '../src/screens/DashboardScreen';
import UsageDetailsScreen from '../src/screens/UsageDetailsScreen';
import GoalsScreen from '../src/screens/GoalsScreen';
import FocusModeScreen from '../src/screens/FocusModeScreen';
import SettingsScreen from '../src/screens/SettingsScreen';

const Stack = createStackNavigator();

// Web-specific wrapper for the app
const AppWeb = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <WebNavigationWrapper>
          <Stack.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: '#F5F5F7' }
            }}
          >
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="UsageDetails" component={UsageDetailsScreen} />
            <Stack.Screen name="Goals" component={GoalsScreen} />
            <Stack.Screen name="FocusMode" component={FocusModeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </WebNavigationWrapper>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default AppWeb;