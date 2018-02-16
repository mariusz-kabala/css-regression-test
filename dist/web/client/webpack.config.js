'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: path.resolve('./web/client'),
  devtool: 'cheap-module-eval-source-map',
  entry: ['react-hot-loader/patch', 'webpack-hot-middleware/client', 'babel-polyfill', './src/index'],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'stage-0'],
          plugins: ['transform-class-properties', 'transform-object-assign', 'transform-object-rest-spread', 'transform-async-to-generator']
        }
      }
    }]
  }
};