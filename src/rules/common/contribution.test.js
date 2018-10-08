import * as helpers from '../helpers';
import commonContribution from './contribution';

const author = 'John Doe';

const mockHelpers = externalPr => {
  helpers.externalPr = externalPr;
  helpers.prAuthor = author;
};

const buildMessage = authorName =>
  `Thanks for the contribution, ${authorName}!`;

describe('commonContribution', () => {
  beforeEach(() => {
    global.message = jest.fn();

    jest.resetAllMocks();
  });

  it('should not message when is not an external contribution', () => {
    mockHelpers(false);

    commonContribution();

    expect(global.message).not.toHaveBeenCalled();
  });

  it('should message when is an external contribution', () => {
    mockHelpers(true);

    const expectedMsg = buildMessage(author);

    commonContribution();

    expect(global.message).toHaveBeenCalledWith(expectedMsg);
  });
});
