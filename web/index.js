import { AppRegistry } from 'react-native';
import React from 'react';
import App from '../App';
import { name as appName } from '../app.json';

// Create a web-specific wrapper
const WebApp = () => {
  return <App />;
};

// Register the app
AppRegistry.registerComponent(appName, () => WebApp);

// Register the web-specific setup
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root')
});

// Handle browser history integration for navigation
if (module.hot) {
  module.hot.accept();
}