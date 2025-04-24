// Polyfill for CommonJS compatibility in the browser
if (typeof window !== 'undefined') {
  // Ensure global.exports exists
  window.exports = window.exports || {};
  
  // Ensure global.module exists
  window.module = window.module || { exports: window.exports };
  
  // Ensure global.process exists
  window.process = window.process || {
    env: { NODE_ENV: 'production' },
    browser: true,
    versions: {},
    cwd: function() { return '/' }
  };
  
  // Ensure global.__dirname exists
  window.__dirname = window.__dirname || '/';
}