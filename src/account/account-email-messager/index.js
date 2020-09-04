const {setupLogger}  = require("/opt/nodejs/logger.js");
const getTemplateText = require("/opt/nodejs/templates/index.js");

const onCustomMessageWelcome = async (event) => {

  const code = event.request.codeParameter;
  const name = event.request.userAttributes['custom:FullName']

  const replacements = [
    { key: "FirstName", value: name },
    { key: "code", value: code }
  ];

  const email = await getTemplateText("./template.html", replacements);
  
  return {
    emailSubject: "Welcome to my super serverless App!",
    emailMessage: email
  };
};

exports.handler = async function(event, context) {
  const logger = setupLogger(context);

  let response = {
    emailSubject: null,
    emailMessage: null
  };

  switch(event.triggerSource){
    case 'CustomMessage_SignUp':
      response = await onCustomMessageWelcome(event);
      break;
    default:
        break;
  }

  if (response !== null) {
    event.response.emailSubject = response.emailSubject;
    event.response.emailMessage =  response.emailMessage;
  }

  logger.log('Loaded template with ', response.emailMessage.length, ' characters');    
  context.done(null, event);
};