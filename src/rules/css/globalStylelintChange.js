// //
// // Check if global stylelint configuration (".stylelintrc") or ".stylelintignore" have been modified.
// //

import getMessageLogger from '../getMessageLogger';
import { inCommitGrep, inCommit } from '../helpers';

export default ({ logTypeStylelintrc, logTypeStylelintignore } = {}) => {
  const changedStylelintrc = inCommitGrep(/^\.stylelintrc(\.\w+)?/);
  const changedStylelintignore = inCommit('.stylelintignore');

  if (changedStylelintrc) {
    const logStylelintrc = getMessageLogger(logTypeStylelintrc);
    logStylelintrc(
      '`.stylelintrc` has been modified. Make sure this change is needed globally and not locally.',
    );
  }

  if (changedStylelintignore) {
    const logStylelintignore = getMessageLogger(logTypeStylelintignore);
    logStylelintignore('`.stylelintignore` has been modified.');
  }
};
