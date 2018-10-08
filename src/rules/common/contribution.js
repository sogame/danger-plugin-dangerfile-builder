// //
// // Thank the author of external contributions.
// //

import { externalPr, prAuthor } from '../helpers';

export default () => {
  if (externalPr) {
    message(`Thanks for the contribution, ${prAuthor}!`);
  }
};
