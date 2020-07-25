const AWS = require("aws-sdk");

const createIdentityServiceProvider = () => {
  return new AWS.CognitoIdentityServiceProvider({region: process.env.APP_REGION});
}

const login = (email, password) => {
  const isp = createIdentityServiceProvider();
  
  const params = {
    ClientId: process.env.APP_USERPOOL_CLIENT_ID,
    AuthFlow: "USER_PASSWORD_AUTH",
    AuthParameters: {
      "USERNAME": email,
      "PASSWORD": password
    }
  };

  return isp.initiateAuth(params).promise();
}

module.exports = {
  login
};