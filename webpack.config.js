var path = require('path');
var webpack = require('webpack');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/main'
  ],
  output: {
      path: path.join(__dirname, './build'),
      publicPath: '/',
      filename: 'main.js'
      // filename: 'bundle'
      // filename: 'bundle.js',
      // path: path.join(__dirname, './dist/bundle'),
      // publicPath: '/dist/bundle'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
        query: {
          presets: ["es2015"],  
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      },
      { test: /\.(glsl|frag|vert)$/, loader: 'raw', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify', exclude: /node_modules/ }
    ]
  },
  debug: true,
  // plugins: [
  //   new BrowserSyncPlugin({
  //     // browse to http://localhost:3000/ during development, 
  //     // ./public directory is being served 
  //     host: 'localhost',
  //     port: 8080,
  //     server: { baseDir: ['build'] }
  //   })
  // ]
};