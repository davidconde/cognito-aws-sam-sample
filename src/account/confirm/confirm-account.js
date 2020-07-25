const {confirm} = require("./cognito-service");
const {getLogger}  = require("/opt/nodejs/logger.js");

const confirmAccount = async (request) => {
  const logger = getLogger();

  const email = request.email;
  const code = request.code;

  if (!email || !code) {
    logger.error({message: "invalid email or code received"});
    return null;
  }

  try {
    const result = await confirm(email, code);
    return result;
  } catch (error) {
    logger.error({ message: "error confirming code", error })
  }
}

module.exports = confirmAccount;