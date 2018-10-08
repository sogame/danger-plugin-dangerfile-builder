// //
// // Check if global eslint configuration (".eslintrc") or ".eslintignore" have been modified.
// //

import getMessageLogger from '../getMessageLogger';
import { inCommitGrep, inCommit } from '../helpers';

export default ({ logTypeEslintrc, logTypeEslintignore } = {}) => {
  const changedEslintrc = inCommitGrep(/^\.eslintrc(\.\w+)?/);
  const changedEslintignore = inCommit('.eslintignore');

  if (changedEslintrc) {
    const logEslintrc = getMessageLogger(logTypeEslintrc);
    logEslintrc(
      '`.eslintrc` has been modified. Make sure this change is needed globally and not locally.',
    );
  }

  if (changedEslintignore) {
    const logEslintignore = getMessageLogger(logTypeEslintignore);
    logEslintignore('`.eslintignore` has been modified.');
  }
};
