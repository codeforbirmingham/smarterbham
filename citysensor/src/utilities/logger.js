const fs = require('fs');
const _ = require('lodash');

const logPath = `${__dirname}/../log`;
const insertLogData = (data, logLevel) => {
  const parsedData = _.isObject(data) ? JSON.stringify(data) : data;
  const logData = `[${new Date()}] ${parsedData}\n`;
  fs.appendFileSync(`${logPath}/${logLevel}.log`, logData);
};

module.exports = {
  error: data => insertLogData(data, 'error'),
  info: data => insertLogData(data, 'info'),
  warn: data => insertLogData(data, 'warn'),
};
