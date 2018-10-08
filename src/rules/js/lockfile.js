// //
// // If dependencies change (changes in "package.json"), "package-lock.json" also must be updated.
// //

import getMessageLogger from '../getMessageLogger';
import { inCommit } from '../helpers';

export default ({ logTypePackage, logTypePackageLock } = {}) => {
  const changedPackage = inCommit('package.json');
  const changedPackagelock = inCommit('package-lock.json');

  if (changedPackage && !changedPackagelock) {
    const logPackage = getMessageLogger(logTypePackage);
    logPackage(
      'Dependencies may have changed, but lockfile has not been updated.',
    );
  }

  if (changedPackagelock && !changedPackage) {
    const logPackageLock = getMessageLogger(logTypePackageLock);
    logPackageLock(
      'Lockfile has been updated, but no dependencies have changed.',
    );
  }
};
