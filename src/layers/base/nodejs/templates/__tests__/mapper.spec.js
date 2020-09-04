const getTemplateText = require("./../index");
jest.mock('fs');

describe("basic tests for mapper", () => {
  beforeAll(() => {
    const MOCK_FILE_INFO = {
      'existing-template': 'existing template',
      'existing-key-template': 'existing template with a {{key}}',
    };

    require('fs').__setMockFiles(MOCK_FILE_INFO);
  })

  it("returns text when no replacements are sent and no keys present", () => {
    const response = getTemplateText("existing-template");
    expect(response).toBe("existing template")
  });

  it("returns text when no replacements are sent and keys are present", () => {
    const response = getTemplateText("existing-key-template");
    expect(response).toBe("existing template with a {{key}}")
  });

  it("performs basic key replacement", () => {
    const replacements = [
      {key: "key", value: "my-replacement"}
    ];
    
    const response = getTemplateText("existing-key-template", replacements);
    expect(response).toBe("existing template with a my-replacement")
  })
})