let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    path.join(__dirname, '../app/webview/src/index.js'),
  ],
  output: {
    path: path.join(__dirname, '..', 'app/webview'),
    filename: 'bundle.js',
    publicPath: '../app/webview/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, '../app/webview/src'),
        loaders: ['babel-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=25000',
      },
      {
        test: /\.txt$/,
        loader: 'raw-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};
