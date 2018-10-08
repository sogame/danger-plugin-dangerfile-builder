/* eslint-disable no-console */

const inquirer = require('inquirer'); // eslint-disable-line import/no-extraneous-dependencies
const releaseit = require('release-it'); // eslint-disable-line import/no-extraneous-dependencies

const questions = [
  {
    type: 'list',
    name: 'version',
    message: 'What version do you want to release?',
    choices: ['patch', 'minor', 'major'].map(choice => ({
      name: choice,
      value: choice,
    })),
  },
  {
    type: 'list',
    name: 'preReleaseTag',
    message: 'What type of release?',
    choices: ['alpha', 'beta', '[regular]'].map(choice => ({
      name: choice,
      value: choice,
    })),
  },
];

async function release() {
  try {
    const { version, preReleaseTag } = await inquirer.prompt(questions);
    const isPreRelease = preReleaseTag !== '[regular]';

    const releaseOptions = {
      increment: isPreRelease ? `pre${version}` : version,
      preReleaseId: isPreRelease ? preReleaseTag : null,
      'non-interactive': true,
      pkgFiles: ['package.json', 'package-lock.json'],
      requireCleanWorkingDir: true,
      src: {
        commit: true,
        tag: true,
        beforeStartCommand:
          'git checkout master && git pull origin master && npm run build',
      },
      npm: {
        publish: true,
        tag: isPreRelease ? preReleaseTag : 'latest',
      },
      github: {
        release: false, // CHANGE TO TRUE!!
        preRelease: isPreRelease,
      },
    };

    const output = await releaseit(releaseOptions);
    console.log('\n', output);
  } catch (exc) {
    console.error(exc);
    process.exit(1);
  }
}

release();
