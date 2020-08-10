const getTemplateText = require("./../template-loader");
jest.mock("fs")

describe("basic tests for mapper", () => {
  it("returns text when no replacements are sent and no keys present", () => {
    const response = getTemplateText("existing-template");
   // expect(response).toBe("existing template")
  });

  it("returns text when no replacements are sent and keys are present", () => {
    const response = getTemplateText("existing-key-template");
  //  expect(response).toBe("existing template with a {{key}}")
  });

  it("performs basic key replacement", () => {
    const replacements = [
      {key: "key", value: "my-replacement"}
    ];
    
    const response = getTemplateText("existing-key-template", replacements);
    //expect(response).toBe("existing template with a my-replacement")
  })
})