const {lambdaHandler} = require("./../index");

jest.mock("fs")
jest.mock("./../cognito-service.js");

describe("basic lambda tests", () => {
  beforeAll(() => {
    const MOCK_FILE_INFO = {
      './header.html': 'anonymous header',
      './header-auth.html': 'user: {{user}}',
    };

    require('fs').__setMockFiles(MOCK_FILE_INFO);
  })

  it("should return anonymous header in the absence of a token", async () => {
    const event = {};

    const resp = await lambdaHandler(event, null);
    expect(resp.body).toBe("anonymous header");
  });

  it("should return anonymous header when token is wrong", async () => {
    const event = {
      queryStringParameters: {
        token: "fake-token"
      }
    };

    const resp = await lambdaHandler(event, null);
    expect(resp.body).toBe("anonymous header");
  });

  it("should return logged in header when token is correct", async () => {
    const event = {
      queryStringParameters: {
        token: "true-secure-token"
      }
    };

    const resp = await lambdaHandler(event, null);
    expect(resp.body).toBe("user: Test user");
  });
})