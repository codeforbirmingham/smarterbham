const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';
const buildPath = path.resolve(__dirname, 'dist');
const sourcePath = path.resolve(__dirname, 'web');

module.exports = {
  context: __dirname,
  target: 'web',
  entry: {
    app: `${sourcePath}/index.jsx`,
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: buildPath,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      sourcePath,
      'node_modules',
    ],
  },
  devtool: isProduction ? 'source-map' : false,
  devServer: {
    contentBase: buildPath,
    port: 3000,
    historyApiFallback: true,
    compress: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${sourcePath}/index.html`,
      inject: true,
      minify: {
        collapseWhitespace: true,
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({ names: ['app', 'vendor'] }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [sourcePath],
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['es2015', 'react'] },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};