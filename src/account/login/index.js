const { ResponseUtil, BodyParser } = require('dcm-lambda-utils');
const {setupLogger}  = require("/opt/nodejs/logger.js");
const {login} = require("./cognito-service");

const isValidRequest = (requestBody) => {
  // insert fancy validation here
  return (
    requestBody.email && requestBody.password
  )
}

exports.lambdaHandler = async (event, context) => {
  const logger = setupLogger(context);
  
  if (!event || !event.body)
    return ResponseUtil.Error(400);

  const body = BodyParser(event);
  
  // poor man's validation
  if (body === null || !isValidRequest(body))
    return ResponseUtil.Error(400);
  
  try {
    logger.info("attempting login for user");
    const res = await login(body.email, body.password);
    return ResponseUtil.OK(res);
  } 
  catch (error) {
    logger.error(error)
    return ResponseUtil.Error(500, "There was an error with the login");
  }
}