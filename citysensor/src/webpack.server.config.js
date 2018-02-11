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
    path: resolve('../dist'),
    filename: 'server.js',
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.HOST': JSON.stringify('localhost'),
    }),
  ],
  externals: [nodeExternals()],
};
