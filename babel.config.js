module.exports = {
  presets: ['@react-native/babel-preset'],
  plugins: [
    // Add support for web platform
    ['react-native-web', { commonjs: true }]
  ],
};
