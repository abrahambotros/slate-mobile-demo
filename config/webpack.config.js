let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(__dirname, '..', 'app/webview/src/index.js'),
  ],
  output: {
    path: path.join(__dirname, '..', 'app/webview'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin('[name].css'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, '../app/webview/src/'),
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
