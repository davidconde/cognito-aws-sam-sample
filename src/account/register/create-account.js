const {signUp} = require("./cognito-service");
const {getLogger}  = require("/opt/nodejs/logger.js");

const saveUser = async (requestBody) => {
  const logger = getLogger();

  const email = requestBody.email;
  const password = requestBody.password;
  const fullName = requestBody.fullName || "";
  const birthday = requestBody.birthday || "";

  if (!email || !password) {
    logger.error({message: "invalid email or password"});
    return null;
  }

  const user = { 
    email,
    password, 
    fullName, 
    birthday
  };

  try {
    const res = await signUp(user);
    return res;
  }catch (error) {
    logger.error(error);
  }
}

module.exports = saveUser;