const winston = require('winston');
const { LOG_LEVEL } = require('./constants');

const serverLogger = winston.createLogger({
  level: LOG_LEVEL,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'server.log' }),
  ],
  format: winston.format.json(),
});

module.exports = { serverLogger };
