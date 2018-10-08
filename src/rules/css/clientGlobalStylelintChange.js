// //
// // Check if client global stylelint configuration (".stylelintrc") or ".stylelintignore" have been modified.
// //

import getMessageLogger from '../getMessageLogger';
import { inCommitGrep, inCommit } from '../helpers';

export default ({ logTypeStylelintrc, logTypeStylelintignore } = {}) => {
  const changedClientStylelintrc = inCommitGrep(
    /^client\/\.stylelintrc(\.\w+)?/,
  );
  const changedClientStylelintignore = inCommit('client/.stylelintignore');

  if (changedClientStylelintrc) {
    const logStylelintrc = getMessageLogger(logTypeStylelintrc);
    logStylelintrc(
      '`client/.stylelintrc` has been modified. Make sure this change is needed globally and not locally.',
    );
  }

  if (changedClientStylelintignore) {
    const logStylelintignore = getMessageLogger(logTypeStylelintignore);
    logStylelintignore('`client/.stylelintignore` has been modified.');
  }
};
