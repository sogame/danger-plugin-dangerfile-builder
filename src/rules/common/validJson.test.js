import fs from 'fs';

import * as helpers from '../helpers';
import commonValidJson from './validJson';

jest.mock('fs');

const validJson = 'valid.json';
const invalidJson = 'invalid.json';
const mockFiles = {
  [validJson]: '{"foo": "bar", "num": 42}',
  [invalidJson]: '{"foo": }',
};

const mockHelpers = committedFilesGrep => {
  helpers.committedFilesGrep = jest.fn(() => committedFilesGrep);
};

const buildMessage = (fileName, msg) =>
  `\`${fileName}\` is not a valid JSON file: \`${msg}\`.`;

describe('commonValidJson', () => {
  beforeEach(() => {
    global.warn = jest.fn();
    global.fail = jest.fn();

    jest.resetAllMocks();

    fs.setMockFiles(mockFiles);
  });

  it('should not warn when there are no files', () => {
    mockHelpers([]);

    commonValidJson();

    expect(global.warn).not.toHaveBeenCalled();
  });

  it('should not warn when the file is valid', () => {
    mockHelpers([validJson]);

    commonValidJson();

    expect(global.warn).not.toHaveBeenCalled();
  });

  it('should warn when the file is invalid', () => {
    mockHelpers([invalidJson]);

    const exception = 'SyntaxError: Unexpected token } in JSON at position 8';
    const expectedMsg = buildMessage(invalidJson, exception);

    commonValidJson();

    expect(global.warn).toHaveBeenCalledWith(expectedMsg);
  });

  it('should log as "logType" when is provided', () => {
    mockHelpers([invalidJson]);

    commonValidJson({ logType: 'fail' });

    expect(global.warn).not.toHaveBeenCalled();
    expect(global.fail).toHaveBeenCalled();
  });
});
