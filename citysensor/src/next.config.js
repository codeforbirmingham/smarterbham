/* eslint-disable import/no-extraneous-dependencies */
const plugins = require('./webpack.server.config.js').plugins;

module.exports = {
  webpack: (config) => {
    plugins.forEach(p => config.plugins.push(p));
    return config;
  },
};
