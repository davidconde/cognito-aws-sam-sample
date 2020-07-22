const { ResponseUtil, BodyParser } = require('dcm-lambda-utils');
const {setupLogger}  = require("/opt/nodejs/logger.js");

const saveUser = require("./create-account");

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
    logger.info("saving user information");

    const result = await saveUser(body);
    return ResponseUtil.OK(result);
  } 
  catch (error) {
    logger.error(error)
    return ResponseUtil.Error(500, "There was an error saving the user");
  }
}