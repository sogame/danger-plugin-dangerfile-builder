// //
// // If client dependencies change (changes in "client/package.json"), "client/package-lock.json" also must be updated.
// //

import getMessageLogger from '../getMessageLogger';
import { inCommit } from '../helpers';

export default ({ logTypePackage, logTypePackageLock } = {}) => {
  const changedClientPackage = inCommit('client/package.json');
  const changedClientPackagelock = inCommit('client/package-lock.json');

  if (changedClientPackage && !changedClientPackagelock) {
    const logPackage = getMessageLogger(logTypePackage);
    logPackage(
      'Client dependencies may have changed, but lockfile has not been updated.',
    );
  }

  if (changedClientPackagelock && !changedClientPackage) {
    const logPackageLock = getMessageLogger(logTypePackageLock);
    logPackageLock(
      'Client lockfile has been updated, but no dependencies have changed.',
    );
  }
};
