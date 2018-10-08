# danger-plugin-dangerfile-builder

> Dangerfile Builder is a [Danger JS](https://danger.systems/js/) plugin containing a set of common validations and utilities, build to make it easy to start using Danger JS.

[![Build Status](https://travis-ci.org/sogame/danger-plugin-dangerfile-builder.svg?branch=master)](https://travis-ci.org/sogame/danger-plugin-dangerfile-builder)
[![SonarCloud Coverage](https://sonarcloud.io/api/project_badges/measure?project=sogame:danger-plugin-dangerfile-builder&metric=coverage)](https://sonarcloud.io/component_measures?id=sogame%3Adanger-plugin-dangerfile-builder&metric=coverage)
[![npm version](https://badge.fury.io/js/danger-plugin-dangerfile-builder.svg)](https://badge.fury.io/js/danger-plugin-dangerfile-builder)
[![Greenkeeper badge](https://badges.greenkeeper.io/sogame/danger-plugin-dangerfile-builder.svg)](https://greenkeeper.io/)

## Installation

```sh
npm install danger-plugin-dangerfile-builder --save-dev
```

## Usage

Edit your `dangerfile.js` to import the required validations and utilities, and buil the contents using those:

```js
import { warn } from 'danger';
import {
  jsLockfile,
  commonValidJson,
  inCommitGrep,
} from 'danger-plugin-dangerfile-builder';

jsLockfile();

commonValidJson();

if (inCommitGrep(/.+\.log$/)) {
  warn('Do not commit log files');
}
```

## Validations and utilities

Find here the documentation of all **validations** and **utilities** provided by Dangerfile Builder:

- [Validations](docs/validations.md)
- [Utilities](docs/utilities.md)

## Changelog

See the release history in [CHANGELOG.md](CHANGELOG.md).

## Contributing

To contribute please see [CONTRIBUTING.md](CONTRIBUTING.md).
