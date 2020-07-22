const AWS = require("aws-sdk");

const createIdentityServiceProvider = () => {
  return new AWS.CognitoIdentityServiceProvider({region: process.env.APP_REGION});
}

const signUp = (user) => {
  const isp = createIdentityServiceProvider();
  
  const attributes = [];
  attributes.push({Name: 'email', Value: user.email});

  if (user.birthday)
    attributes.push({Name: 'custom:Birthday', Value: user.birthday});
  
  if (user.fullName)
    attributes.push({Name: 'custom:FullName', Value: user.fullName});

  const params = {
    ClientId: process.env.APP_USERPOOL_CLIENT_ID, 
    Username: user.email,
    Password: user.password,
    UserAttributes: attributes
  };

  return isp.signUp(params).promise();
}

module.exports = {
  signUp
};