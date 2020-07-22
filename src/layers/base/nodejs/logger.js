const winston = require("winston");

let logger = null;

const setupLogger = (context) => {
  const appLogLevel = process.env.APP_LOG_LEVEL || "error";
  let functionName = "UNKNOWN";
  let functionVersion = "$LATEST";

  if (context) {
    functionName = context.functionName;
    functionVersion = context.functionVersion;
  }

  logger = winston.createLogger({
    level: appLogLevel,
    defaultMeta: {
      functionName: functionName,
      functionVersion: functionVersion
    },
    transports: [
      new winston.transports.Console()
    ]
  });

  return logger;
};

const getLogger = () => {
  if (logger === null)
    throw new Error("you must call setup first to start your logger");
  
  return logger;
}

module.exports = {setupLogger, getLogger};