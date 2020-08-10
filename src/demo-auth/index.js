const { ResponseUtil } = require('dcm-lambda-utils');
const {setupLogger, getLogger}  = require("/opt/nodejs/logger.js");
const checkCredentials = require("./cognito-service");
const getTemplateText = require("./template-loader");

const composeResponse = (template) => {
  const response = ResponseUtil.OK({});
  response.headers["Content-Type"] = "text/html";
  response.body = template;

  return response;
}

const anonymousResponse = () => {
  const logger = getLogger();
  logger.info("No authentication provided, returning anonymous header");
  
  try {
    const template = getTemplateText("./header.html", []);
    return composeResponse(template);
  } catch (error) {
    logger.error(error)
  }
}

const authenticatedResponse = (user) => {
  const logger = getLogger();
  logger.info("user authenticated, returning logged in header");

  const replacements = [];

  if (user) {
    replacements.push({key: "user", value: user["custom:FullName"]});
  }

  try {
    const template = getTemplateText("./header-auth.html", replacements);
    return composeResponse(template);
  } catch (error) {
    logger.error(error);
    logger.info("fallback to anonymous template");
    return anonymousResponse();
  }  
}

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