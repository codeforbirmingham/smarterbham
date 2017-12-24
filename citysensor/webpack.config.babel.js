import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import nodeExternals from 'webpack-node-externals';
import path from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import webpack from 'webpack';

const isProduction = process.env.NODE_ENV === 'production';
const buildPath = path.resolve(__dirname, 'dist');
const clientPath = path.resolve(__dirname, 'web');
const publicPath = path.resolve(__dirname, 'public');
const serverPath = path.resolve(__dirname, 'server');
const extractSCSS = new ExtractTextPlugin('[name].[contenthash].css');

const client = {
  context: __dirname,
  target: 'web',
  entry: {
    app: `${clientPath}/index.jsx`,
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
      clientPath,
      'node_modules',
    ],
  },
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  devServer: {
    port: 3000,
    contentBase: buildPath,
    historyApiFallback: true,
  },
  plugins: [
    extractSCSS,
    new HtmlWebpackPlugin(
      {
        inject: true,
        template: `${publicPath}/index.html`,
      },
    ),
    new webpack.optimize.CommonsChunkPlugin({ names: ['app', 'vendor'] }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_URL: isProduction
          ? JSON.stringify('https://?')
          : JSON.stringify('http://localhost:8000'),
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              'react',
              ['env',
                {
                  targets: {
                    browsers: ['last 2 Chrome versions'],
                  },
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(scss)$/,
        use: ['css-hot-loader'].concat(extractSCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { alias: { '../img': `${publicPath}/img` } },
            },
            {
              loader: 'sass-loader',
            },
          ],
        })),
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico)$/,
        use: [
          {
            // loader: 'url-loader'
            loader: 'file-loader',
            options: {
              name: './img/[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: './fonts/[name].[hash].[ext]',
        },
      },
    ],
  },
};

const server = {
  target: 'node',
  node: {
    fs: 'empty',
    __dirname: false, // required for linux
  },
  entry: {
    server: `${serverPath}/server.js`,
  },
  output: {
    path: buildPath,
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env'],
            plugins: ['transform-async-to-generator'],
          },
        },
      },
    ],
  },
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: isProduction,
        mangle: isProduction,
      },
    }),
  ],
  externals: [nodeExternals()], // ignores including node_modules
};

export default [client, server];
