const { ResponseUtil, BodyParser } = require('dcm-lambda-utils');
const saveUser = require("./create-account");

const isValidRequest = (requestBody) => {
  // insert fancy validation here
  return (
    requestBody.email && requestBody.password
  )
}

exports.lambdaHandler = async (event, context) => {
  
  if (!event || !event.body)
    return ResponseUtil.Error(400);

  const body = BodyParser(event);
  
  // poor man's validation
  if (body === null || !isValidRequest(body))
    return ResponseUtil.Error(400);
  
  try {
    const result = saveUser(body);
    return ResponseUtil.OK(result);
  } 
  catch (error) 
  {
    return ResponseUtil.Error(500, "There was an error saving the user");
  }


  
}