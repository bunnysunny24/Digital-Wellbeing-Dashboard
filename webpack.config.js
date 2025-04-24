const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    index: './web/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'web/dist'),
    publicPath: process.env.NODE_ENV === 'production' ? '/React_native/' : '/',
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules\/(?!(react-native-vector-icons)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@react-native/babel-preset'],
            plugins: ['babel-plugin-react-native-web'],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.web.js', '.js', '.web.jsx', '.jsx', '.web.ts', '.ts', '.web.tsx', '.tsx'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native-vector-icons': 'react-native-vector-icons/dist',
      '@react-native-async-storage/async-storage': path.resolve(__dirname, 'web/AsyncStorageWeb.js'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'web/index.html'),
      filename: 'index.html',
      inject: true,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'web'),
    },
    historyApiFallback: true,
    port: 8081,
    host: '0.0.0.0',
    open: true,
    hot: true,
  },
};