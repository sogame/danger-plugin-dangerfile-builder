import * as helpers from '../helpers';
import cssRemOverEm from './remOverEm';

const validScss = 'valid.scss';
const invalidScss = 'invalid.scss';
const mockFiles = {
  [validScss]: 'padding: 3rem;',
  [invalidScss]: 'padding: 3em;',
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

describe('cssRemOverEm', () => {
  beforeEach(() => {
    global.warn = jest.fn();
    global.fail = jest.fn();

    jest.resetAllMocks();
  });

  it('should not warn when using "rem"', async () => {
    mockHelpers([validScss]);

    await cssRemOverEm();

    expect(global.warn).not.toHaveBeenCalled();
  });

  it('should warn when using "em"', async () => {
    mockHelpers([invalidScss]);

    await cssRemOverEm();

    expect(global.warn).toHaveBeenCalledWith(
      expect.stringContaining(invalidScss),
    );
  });

  it('should log as "logType" when is provided', async () => {
    mockHelpers([invalidScss]);

    await cssRemOverEm({ logType: 'fail' });

    expect(global.warn).not.toHaveBeenCalled();
    expect(global.fail).toHaveBeenCalled();
  });
});
