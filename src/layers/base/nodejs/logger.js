const winston = require("winston");

const setupLogging = (context) => {
  const logger = winston.createLogger({
    level: process.env.APP_LOG_LEVEL,
    defaultMeta: {
      functionName: context.functionName,
      functionVersion: context.functionVersion
    },
    transports: [
      new winston.transports.Console()
    ]
  });

  return logger;
};

module.exports = setupLogging;