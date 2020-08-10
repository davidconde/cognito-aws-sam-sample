const { Security } = require('dcm-lambda-utils');
const {getLogger}  = require("/opt/nodejs/logger.js");

const checkCredentials = async token => {
  const pool = process.env.APP_USERPOOL_ID;
  const region = process.env.APP_REGION;
  const logger = getLogger();

  try {
    let validatedUser = await Security.decodeJWTToken(token, pool, region);
    return validatedUser;
  } catch (error) {
    logger.error("There was an error", error);
    return null;
  }
};

module.exports = checkCredentials;