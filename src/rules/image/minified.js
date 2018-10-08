// //
// // When uploading an image, make sure it's minified.
// //

import getMessageLogger from '../getMessageLogger';
import { inCommitGrep } from '../helpers';

export default ({ logType } = {}) => {
  const changedSvg = inCommitGrep(/.+\.svg$/);
  const changedPng = inCommitGrep(/.+\.png$/);
  const changedJpg = inCommitGrep(/.+\.jpe?g$/);
  const log = getMessageLogger(logType);

  if (changedSvg) {
    log(
      'Please, make sure that all SVG files are minified. Any online tool can be used, like for example [SVGOMG](https://jakearchibald.github.io/svgomg/).',
    );
  }

  if (changedPng) {
    log(
      'Please, make sure that all PNG files are minified. Any online tool can be used, like for example [TinyPNG](https://tinypng.com/).',
    );
  }

  if (changedJpg) {
    log(
      'Please, make sure that all JPG files are minified. Any online tool can be used, like for example [TinyPNG](https://tinypng.com/).',
    );
  }
};
