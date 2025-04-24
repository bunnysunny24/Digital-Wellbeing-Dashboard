import { AppRegistry } from 'react-native';
import AppWeb from './AppWeb';

// Register the app
AppRegistry.registerComponent('MyNewApp', () => AppWeb);

// Initialize web app
if (window.document) {
  AppRegistry.runApplication('MyNewApp', {
    rootTag: document.getElementById('root')
  });
}