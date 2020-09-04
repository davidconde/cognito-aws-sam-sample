const { ResponseUtil } = require('dcm-lambda-utils');

const {getLogger}  = require("/opt/nodejs/logger.js");
const getTemplateText = require("/opt/nodejs/templates/index.js");

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

module.exports = {
  anonymousResponse,
  authenticatedResponse
};