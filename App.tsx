import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';
import UsageDetailsScreen from './src/screens/UsageDetailsScreen';
import GoalsScreen from './src/screens/GoalsScreen';
import FocusModeScreen from './src/screens/FocusModeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
};

export default App;
