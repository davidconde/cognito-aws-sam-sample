const saveUser = require("./../create-account");
const {setupLogger}  = require("/opt/nodejs/logger.js");

jest.mock("./../cognito-service.js");
setupLogger();

describe("creation tests", () => {
  it("returns null when not sending email or password", async () => {
    const request = {};
    const result = await saveUser(request);
    expect(result).toBe(null);
  });

  it("saves full object when passing request down", async () => {
    const email = "email@sample-email.com";
    const pwd = "T3st!Password!";

    const request = { email: email, password: pwd };
    const result = await saveUser(request);

    expect(result.email).toBe(email);
    expect(result.password).toBe(pwd);
  });

})