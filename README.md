# Text Certification Microservice

[![Build Status](https://travis-ci.com/oegea/certification-service.svg?branch=master)](https://travis-ci.com/oegea/certification-service) [![Coverage Status](https://coveralls.io/repos/github/oegea/certification-service/badge.svg?branch=master)](https://coveralls.io/github/oegea/certification-service?branch=master) ![Known Vulnerabilities](https://snyk.io/test/github/oegea/certification-service/badge.svg)

## Work in Progress

This project is still under development.

## Why?

This is a easy-to-use service that allows to issue and sign basic text certificates. It has been designed specially for e-learning websites, trying to provide to them a way to generate certificates for their students in a de-centralized way.

However, although this has been created having in mind e-learning sites, its simplicity brings the posibility of using it in other different scenarios where basic simmetric signing is required.

## Required dependencies

In order to compile and modify the project you need to install both dependencies and development dependencies.
`npm` package manager has been used to create this project.

A `npm install` just be enought to install required dependencies.

## Recommended development environment

VSCode with ESLint extension is recommended. 
During the development, the extension has been configured to automatically fix code style errors following the airbnb style guide.

## Compiling and working

These are the supported commands:
* `npm run build`: Compiles the project and places the output in the `dist` directory.
* `npm start`: Compiles the project and starts it.
* `npm run dev`: Compiles the project, start it, and recompiles when a `src` file is modified.
* `npm test`: Runs tests.
* `npm run test:coverage`: Runs tests with a code coverage report.
* `npm run coveralls`: Runs tests with a code coverage report and uploads it to coveralls. This command is only invoked from TravisCI to update the code coverage badge.