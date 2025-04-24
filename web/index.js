import { AppRegistry } from 'react-native';
import AppWeb from './AppWeb';
import { name as appName } from '../app.json';

// Ensure the default React Native styles don't override your app
const css = `
  html, body, #root {
    height: 100%;
    margin: 0;
    padding: 0;
    -webkit-overflow-scrolling: touch;
  }
  
  #root {
    display: flex;
    flex-direction: column;
  }
`;

// Register the app
AppRegistry.registerComponent(appName, () => AppWeb);

// Initialize web app
if (window.document) {
  // Inject custom styles to fix layout issues
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root')
  });
}