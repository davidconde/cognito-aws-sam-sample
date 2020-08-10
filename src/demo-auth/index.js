const {setupLogger}  = require("/opt/nodejs/logger.js");
const checkCredentials = require("./cognito-service");
const {anonymousResponse, authenticatedResponse} = require("./response-processor");

exports.lambdaHandler = async (event, context) => {
  const logger = setupLogger(context);

  let token = null;
  let user = null;

  if (event.queryStringParameters && event.queryStringParameters.token) {
    token = event.queryStringParameters.token;
  } 

  try {
    if (token) {
      user = await checkCredentials(token);
      logger.info("user is")
      logger.info(user)
    }
      
    if (user !== null)
      return authenticatedResponse(user);
    else
      return anonymousResponse();
  } catch (error) {
    return anonymousResponse();
  }
}