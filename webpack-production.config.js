'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './build/client/index'
  ],
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
    module: {
        loaders: [{
            test: /\.css/,
            loader: 'style!css'
        }, {
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }]
    },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
          'PORT': JSON.stringify('8080'),
          'WS_PORT': JSON.stringify('8082')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

