/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const resolve = toPath => path.resolve(__dirname, toPath);

module.exports = {
  target: 'node',
  node: {
    fs: 'empty',
    __dirname: false, // required for linux
  },
  entry: resolve('server.js'),
  output: {
    path: resolve('../dist/src'),
    filename: 'server.js',
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  externals: [nodeExternals()],
};
