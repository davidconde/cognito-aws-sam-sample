const AWS = require("aws-sdk");

const createIdentityServiceProvider = () => {
  return new AWS.CognitoIdentityServiceProvider({region: process.env.APP_REGION});
}

const confirm = (email, code) => {
  const isp = createIdentityServiceProvider();
  
  const params = {
    ClientId: process.env.APP_USERPOOL_CLIENT_ID,
    ConfirmationCode: code,
    Username: email
  };

  return isp.confirmSignUp(params).promise();
}

module.exports = {
  confirm
};