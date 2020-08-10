
const checkCredentials = async token => {
  if (token === "true-secure-token") {
    return {
      "custom:FullName": "Test user"
    };
  }

  return null;
};

module.exports = checkCredentials;