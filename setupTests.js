global.danger = {
  git: {
    created_files: [],
    modified_files: [],
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
