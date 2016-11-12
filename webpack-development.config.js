'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './source/client/index'
  ],
  output: {
    path: path.join(__dirname,  'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
          'PORT': JSON.stringify('3000'),
          'WS_PORT': JSON.stringify('8082')
      }
    })
  ],
  module: {
    loaders: [{
        test: /\.css/,
        loader: 'style!css'
    }, {
      tests: /\.js?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'source')
    }, {
        test: /\.json$/,
        loader: 'json'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

