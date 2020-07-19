const {lambdaHandler} = require("../index");
jest.mock("./../create-account.js");

describe("validation tests", () => {

  const createBody = (body) => {
    return {
      body: JSON.stringify(body)
    };
  }

  it("validates null body being posted and returns 400",  async () => {
    const response = await lambdaHandler(null, null);

    expect(typeof response).toBe("object");
    expect(response.statusCode).toBe(400);
  });

  it("validates no email being posted and returns 400",  async () => {
    const response = await lambdaHandler(createBody(), null);

    expect(typeof response).toBe("object");
    expect(response.statusCode).toBe(400);
  });

  it("validates full body being posted and returns 200",  async () => {
    
    const body = {
      email: "sample.email@email.com",
      password: "aPassW0rd!",
    };

    const response = await lambdaHandler(createBody(body), null);

    expect(typeof response).toBe("object");
    expect(response.statusCode).toBe(200);
  });
})