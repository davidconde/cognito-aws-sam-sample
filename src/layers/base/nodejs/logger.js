const winston = require("winston");

const setupLogging = (context) => {

  const appLogLevel = process.env.APP_LOG_LEVEL || "error";
  let functionName = "UNKNOWN";
  let functionVersion = "$LATEST";

  if (context) {
    functionName = context.functionName;
    functionVersion = context.functionVersion;
  }

  const logger = winston.createLogger({
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

module.exports = setupLogging;