import fs from 'fs';

const logPath = process.env.NODE_ENV === 'production' ? `${__dirname}/log` : `${__dirname}/../log`;
const insertLogData = (data, logLevel) => {
  const parsedData = JSON.stringify(data);
  const logData = `[${new Date()}] ${parsedData}\n`;
  fs.appendFileSync(`${logPath}/${logLevel}.log`, logData);
};

export default {
  error: data => insertLogData(data, 'error'),
  info: data => insertLogData(data, 'info'),
  warn: data => insertLogData(data, 'warn'),
};
