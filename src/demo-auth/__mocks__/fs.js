// Taken from https://jestjs.io/docs/en/manual-mocks
'use strict';

const path = require('path');

const fs = jest.createMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = Object.create(null);

function __setMockFiles(newMockFiles) {
  mockFiles = newMockFiles;
}

function readFileSync(name, encoding) {
  return mockFiles[name];
}

fs.__setMockFiles = __setMockFiles;
fs.readFileSync = readFileSync;

module.exports = fs;