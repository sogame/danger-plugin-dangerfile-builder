// //
// // Check if client global eslint configuration (".eslintrc") or ".eslintignore" have been modified.
// //

import getMessageLogger from '../getMessageLogger';
import { inCommitGrep, inCommit } from '../helpers';

export default ({ logTypeEslintrc, logTypeEslintignore } = {}) => {
  const changedClientEslintrc = inCommitGrep(/^client\/\.eslintrc(\.\w+)?/);
  const changedClientEslintignore = inCommit('client/.eslintignore');

  if (changedClientEslintrc) {
    const logEslintrc = getMessageLogger(logTypeEslintrc);
    logEslintrc(
      '`client/.eslintrc` has been modified. Make sure this change is needed globally and not locally.',
    );
  }

  if (changedClientEslintignore) {
    const logEslintignore = getMessageLogger(logTypeEslintignore);
    logEslintignore('`client/.eslintignore` has been modified.');
  }
};
