import { AppRegistry } from 'react-native';
import App from '../App';

// Register the app
AppRegistry.registerComponent('MyNewApp', () => App);

// Initialize web app
if (window.document) {
  AppRegistry.runApplication('MyNewApp', {
    rootTag: document.getElementById('root')
  });
}