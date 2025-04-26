import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './src/context/ThemeContext';
import { View, Text, ActivityIndicator, LogBox, SafeAreaView } from 'react-native';
import { loadSettings } from './src/utils/storageUtils';

// Import screens
import DashboardScreen from './src/screens/DashboardScreen';
import UsageDetailsScreen from './src/screens/UsageDetailsScreen';
import GoalsScreen from './src/screens/GoalsScreen';
import FocusModeScreen from './src/screens/FocusModeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// Ignore specific LogBox warnings
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'ViewPropTypes will be removed'
]);

const Stack = createStackNavigator();

// Error Boundary Component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>Something went wrong</Text>
          <Text 
            style={{ color: 'blue', textDecorationLine: 'underline' }}
            onPress={() => this.setState({ hasError: false })}
          >
            Try Again
          </Text>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load initial app settings
        await loadSettings();
        
        // Add any other initialization logic here
        
        setIsLoading(false);
      } catch (error) {
        console.error('App initialization error:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, marginBottom: 20 }}>Failed to initialize app</Text>
        <Text 
          style={{ color: 'blue', textDecorationLine: 'underline' }}
          onPress={() => window.location.reload()}
        >
          Reload App
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <NavigationContainer
          fallback={<ActivityIndicator size="large" color="#0000ff" />}
          onStateChange={(state) => {
            // Handle navigation state changes
            console.log('New navigation state:', state);
          }}
        >
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
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
