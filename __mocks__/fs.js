const fs = jest.genMockFromModule('fs');

// This is a custom function that our tests can use during setup to specify
// what the files on the "mock" filesystem should look like when any of the
// `fs` APIs are used.
let mockFiles = {};
const setMockFiles = newMockFiles => {
  mockFiles = Object.assign({}, newMockFiles);
};

const readFileSync = filename => mockFiles[filename] || '';

fs.setMockFiles = setMockFiles;
fs.readFileSync = readFileSync;

module.exports = fs;
