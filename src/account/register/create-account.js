const {signUp} = require("./cognito-service");


const saveUser = (requestBody) => {

  const email = requestBody.email;
  const password = requestBody.password;
  const fullName = requestBody.fullName || "";
  const birthday = requestBody.birthday || "";

  const user = { 
    email,
    password, 
    fullName, 
    birthday
  };

  



}

module.exports = saveUser;