import * as helpers from '../helpers';
import commonContributingGuide from './contributingGuide';

const author = 'John Doe';

const mockHelpers = externalPr => {
  helpers.externalPr = externalPr;
  helpers.prAuthor = author;
  helpers.href = jest.fn(filename => `[[${filename}]]`);
};

const buildMessage = (authorName, fileName) =>
  `Thanks for the contribution, ${authorName}! Please, make sure to follow our [[${fileName}]].`;

describe('commonContributingGuide', () => {
  beforeEach(() => {
    global.message = jest.fn();

    jest.resetAllMocks();
  });

  it('should not message when is not an external contribution', () => {
    mockHelpers(false);

    commonContributingGuide();

    expect(global.message).not.toHaveBeenCalled();
  });

  it('should message when is an external contribution', () => {
    mockHelpers(true);

    const expectedMsg = buildMessage(author, 'CONTRIBUTING.md');

    commonContributingGuide();

    expect(global.message).toHaveBeenCalledWith(expectedMsg);
  });

  it('should allow modifying the contributing filename', () => {
    mockHelpers(true);

    const newFilename = 'another_contributing.md';
    const expectedMsg = buildMessage(author, newFilename);

    commonContributingGuide({ contributingFile: newFilename });

    expect(global.message).toHaveBeenCalledWith(expectedMsg);
  });
});
