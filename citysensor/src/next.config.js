/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');

module.exports = {
  webpack: (config) => {
    if (!process.env.HOST) return console.log('\x1b[31m', 'Require HOST for target environment: HOST=', '\x1b[0m');
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.HOST': JSON.stringify(process.env.HOST),
      })
    );
    return config;
  },
};
