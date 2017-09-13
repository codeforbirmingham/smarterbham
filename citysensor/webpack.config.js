const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
    extensions: ['.js', '.jsx', '.json', '.css'],
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
    new ExtractTextPlugin('[name].[contenthash].css'),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [sourcePath],
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { modules: false }],
            'stage-0',
            'react',
          ],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      { /*
        * required for react-toolbox!
        * https://github.com/react-toolbox/react-toolbox-example
        */
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]--[local]--[hash:base64:8]',
              minimize: {
                autoprefixer: {
                  add: true,
                  remove: true,
                  browsers: ['last 2 versions'],
                },
                discardComments: {
                  removeAll: true,
                },
                safe: true,
                sourcemap: isProduction,
              },
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      },
    ],
  },
};
