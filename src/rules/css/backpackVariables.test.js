import * as helpers from '../helpers';
import cssBackpackVariables from './backpackVariables';

const validScss = 'valid.scss';
const invalidScss = 'invalid.scss';
const mockFiles = {
  [validScss]: 'padding: $bpk-spacing-sm;',
  [invalidScss]: 'padding: 3rem;',
};

const mockHelpers = committedFilesGrep => {
  helpers.committedFilesGrep = jest.fn(() => committedFilesGrep);
  helpers.fileAddedLineMatch = jest.fn(
    (filename, pattern) =>
      new Promise(resolve => {
        const fileContents = mockFiles[filename] || '';
        resolve(fileContents.match(pattern) !== null);
      }),
  );
};

describe('cssBackpackVariables', () => {
  beforeEach(() => {
    global.warn = jest.fn();
    global.fail = jest.fn();

    jest.resetAllMocks();
  });

  it('should not warn when there are no files', async () => {
    mockHelpers([]);

    await cssBackpackVariables();

    expect(global.warn).not.toHaveBeenCalled();
  });

  it('should not warn when the file is valid', async () => {
    mockHelpers([validScss]);

    await cssBackpackVariables();

    expect(global.warn).not.toHaveBeenCalled();
  });

  it('should warn when the file is invalid', async () => {
    mockHelpers([invalidScss]);

    await cssBackpackVariables();

    expect(global.warn).toHaveBeenCalledWith(
      expect.stringContaining(invalidScss),
    );
  });

  it('should log as "logType" when is provided', async () => {
    mockHelpers([invalidScss]);

    await cssBackpackVariables({ logType: 'fail' });

    expect(global.warn).not.toHaveBeenCalled();
    expect(global.fail).toHaveBeenCalled();
  });
});
