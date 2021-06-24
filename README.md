# Text Certification Microservice

## Work in Progress

This project is still under development.

## Why?

This is a easy-to-use service that allows to issue and sign basic text certificates. It has been designed specially for e-learning websites, trying to provide to them a way to generate certificates for their students in a de-centralized way.

However, although this has been created having in mind e-learning sites, its simplicity brings the posibility of using it in other different scenarios where basic simmetric signing is required.

## Required dependencies

In order to compile and modify the project you need to install both dependencies and development dependencies.
`npm` package manager has been used to create this project.

## Recommended development environment

VSCode with ESLint extension is recommended.

## Compiling and working

These are the supported commands:
* `npm run build`: Compiles the project and places the output in the `dist` directory.
* `npm start`: Compiles the project and starts it.
* `npm run dev`: Compiles the project, start it, and recompiles when a `src` file is modified.
* `npm test`: Runs tests.
* `npm run test:coverage`: Runs tests with a code coverage report.