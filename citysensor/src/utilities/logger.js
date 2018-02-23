const fs = require('fs');
const _ = require('lodash');

const insertLogData = (data, logLevel) => {
  const parsedData = _.isObject(data) ? JSON.stringify(data) : data;
  const logData = `${new Date()} [${logLevel}]: ${parsedData}\n`;
  fs.appendFileSync('citysensor.log', logData, 'utf8');
};

module.exports = {
  error: data => insertLogData(data, 'ERROR'),
  info: data => insertLogData(data, 'INFO'),
  warn: data => insertLogData(data, 'WARN'),
};
