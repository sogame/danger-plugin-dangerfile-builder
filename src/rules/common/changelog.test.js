import * as helpers from '../helpers';
import commonChangelog from './changelog';

const mockHelpers = (inCommit, isTrivial) => {
  helpers.inCommit = jest.fn(() => inCommit);
  helpers.isTrivial = isTrivial;
};

const buildMessage = fileName => `\`${fileName}\` has not been updated.`;

describe('commonChangelog', () => {
  beforeEach(() => {
    global.warn = jest.fn();
    global.fail = jest.fn();

    jest.resetAllMocks();
  });

  it('should warn when not changed and not trivial', () => {
    mockHelpers(false, false);

    const expectedMsg = buildMessage('CHANGELOG.md');

    commonChangelog();

    expect(global.warn).toHaveBeenCalledWith(expectedMsg);
  });

  it('should not warn when not changed and trivial', () => {
    mockHelpers(false, true);

    commonChangelog();

    expect(global.warn).not.toHaveBeenCalled();
  });

  it('should not warn when changed and trivial', () => {
    mockHelpers(true, true);

    commonChangelog();

    expect(global.warn).not.toHaveBeenCalled();
  });

  it('should not warn when changed and not trivial', () => {
    mockHelpers(true, false);

    commonChangelog();

    expect(global.warn).not.toHaveBeenCalled();
  });

  it('should log as "logType" when is provided', () => {
    mockHelpers(false, false);

    commonChangelog({ logType: 'fail' });

    expect(global.warn).not.toHaveBeenCalled();
    expect(global.fail).toHaveBeenCalled();
  });

  it('should allow modifying the contributing filename', () => {
    mockHelpers(false, false);

    const newFilename = 'newFilename.md';
    const expectedMsg = buildMessage(newFilename);

    commonChangelog({ changelogFile: newFilename });

    expect(global.warn).toHaveBeenCalledWith(expectedMsg);
  });
});
