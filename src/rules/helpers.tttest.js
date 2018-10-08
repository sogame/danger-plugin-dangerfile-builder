import * as helpers from './helpers';

const { committedFilesGrep } = helpers;
// let { committedFiles } = helpers;
// import { committedFiles, committedFilesGrep } from './helpers';

const mockHelpers = ({
  committedFilesMock = [],
  createdFiles = [],
  modifiedFiles = [],
}) => {
  // helpers.committedFiles = committedFiles;
  helpers.committedFiles = committedFilesMock;
  // committedFiles = committedFilesMock;
  // helpers.inCommit = jest.fn(() => inCommit);

  global.danger = {
    git: {
      created_files: createdFiles,
      modified_files: modifiedFiles,
      commits: [],
      diffForFile: jest.fn(),
    },
    github: {
      pr: {
        title: '',
        body: '',
        user: { login: '' },
        base: {
          ref: '',
          repo: { id: '' },
        },
        head: {
          ref: '',
          repo: { id: '' },
        },
      },
    },
    utils: { href: jest.fn() },
  };
};

describe('helpers', () => {
  beforeEach(() => {
    global.warn = jest.fn();
    global.fail = jest.fn();

    jest.resetAllMocks();
  });

  describe('committedFilesGrep', () => {
    beforeEach(() => {
      mockHelpers({
        committedFilesMock: ['foo', 'bar', 'abc'],
        createdFiles: ['foo', 'bar'],
        modifiedFiles: ['abc'],
      });
    });

    it('should return empty array when there are not matches', () => {
      const pattern = /aaa/;

      const expected = [];
      const result = committedFilesGrep(pattern);

      expect(result).toEqual(expected);
    });

    it('should return matching files', () => {
      const pattern = /a/;

      const expected = ['bbbar', 'abc'];
      const result = committedFilesGrep(pattern);

      expect(result).toEqual(expected);
    });
  });
});

/*
import { committedFilesGrep } from './helpers';

describe('committedFilesGrep', () => {
  beforeEach(() => {
    global.fail = jest.fn();
    global.warn = jest.fn();
    global.message = jest.fn();
    global.danger = {
      git: {
        created_files: ['created_aaa', 'created_bbb'],
        modified_files: ['modified_aaa', 'modified_bbb'],
        commits: [],
        diffForFile: jest.fn(),
      },
      github: {
        pr: {
          title: 'prTitle',
          body: 'prDescription',
          user: { login: 'prAuthor' },
          base: {
            ref: 'targetBranch',
            repo: { id: 'targetProjectId' },
          },
          head: {
            ref: 'sourceBranch',
            repo: { id: 'sourceProjectId' },
          },
        },
      },
      utils: { href: jest.fn() },
    };
  });

  afterEach(() => {
    global.fail = undefined;
    global.warn = undefined;
    global.message = undefined;
    global.danger = undefined;
  });

  // jest.mock('committedFiles', () => ['aaa', 'bbb']);

  it('should return true when the file has been committed', () => {
    const pattern = /created_[a]+/;
    const expected = true;

    const result = committedFilesGrep(pattern);

    expect(result).toEqual(expected);
  });
});
*/
