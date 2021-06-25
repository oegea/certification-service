# Text Certification Microservice

[![Build Status](https://travis-ci.com/oegea/certification-service.svg?branch=master)](https://travis-ci.com/oegea/certification-service) [![Coverage Status](https://coveralls.io/repos/github/oegea/certification-service/badge.svg?branch=master)](https://coveralls.io/github/oegea/certification-service?branch=master) ![Known Vulnerabilities](https://snyk.io/test/github/oegea/certification-service/badge.svg)

## Why?

This is a easy-to-use service that allows to issue and sign basic text certificates. It has been designed specially for e-learning websites, trying to provide to them a way to generate certificates for their students in a de-centralized way.

However, although this has been created having in mind e-learning sites, its simplicity brings the posibility of using it in other different scenarios where basic simmetric signing is required.

## Required dependencies

In order to compile and modify the project you need to install both dependencies and development dependencies.
`npm` package manager has been used to create this project.

A `npm install` should be enought to install required dependencies.

## Recommended development environment

VSCode with ESLint extension is recommended. 

During the development, the extension [has been configured to automatically fix code style errors](https://www.digitalocean.com/community/tutorials/linting-and-formatting-with-eslint-in-vs-code#step-4-%E2%80%94-formatting-on-save) following the airbnb style guide.

## Compiling and working

These are the supported commands:
* `npm run build`: Compiles the project and places the output in the `dist` directory.
* `npm start`: Compiles the project and starts it.
* `npm run dev`: Compiles the project, start it, and recompiles when a `src` file is modified.
* `npm test`: Runs tests.
* `npm run test:coverage`: Runs tests with a code coverage report.
* `npm run coveralls`: Runs tests with a code coverage report and uploads it to coveralls. This command is only invoked from TravisCI to update the code coverage badge.

## How to use

### Generating a key pair

A key pair is needed to issue and sign certificates. A new key pair can be generated performing the following HTTP request:

#### Request

`GET /certification-entity/generate`

No parameters are required.

#### Response
Just take the `publicKey` and `privateKey` parameters, save and use them accordingly. Remember: Never expose your private key publicly.

```json
{
    "success": true,
    "data": {
        "publicKey": "-----BEGIN RSA PUBLIC KEY----- ... -----END RSA PUBLIC KEY-----\n",
        "privateKey": "-----BEGIN RSA PRIVATE KEY----- ... -----END RSA PRIVATE KEY-----\n"
    }
}
```
### Issuing and signing a new certificate

Once you have your public and private keys, you can issue and sign a new certificate, performing the following http request.

#### Request

`POST /certificate/sign`

**Parameters**:

```json
{
	"privateKey": "-----BEGIN RSA PRIVATE KEY----- ... -----END RSA PRIVATE KEY-----\n",
	"certificate": {
		"verificationAddress": "",
		"publicKey": "-----BEGIN RSA PUBLIC KEY----- ... -----END RSA PUBLIC KEY-----\n",
		"certificationEntity": "Issuer",
		"certifiedEntity": "Receiver",
		"data": "Text to certify",
		"signature": "",
		"timestamp": ""
	}
}
```

#### Response

The `certificate` object is returned back, filling the `timestamp` and `signature` properties.

```json
{
    "success": true,
    "data": {
        "publicKey": "-----BEGIN RSA PUBLIC KEY----- ... -----END RSA PUBLIC KEY-----\n",
        "certificationEntity": "Issuer",
        "certifiedEntity": "Receiver",
        "data": "Text to certify",
        "timestamp": "Thu Jun 24 2021 20:41:35 GMT+0200 (hora de verano de Europa central)",
        "verificationAddress": "",
        "signature": "..."
    }
}
```

### Validating a signature

The following endpoint validates a certificate's signature. If there was specified a verification address, the authenticity of the public key is checked performing an http request to the indicated verification address.

#### Request

`POST /certificate/validate`

**Parameters**:

```json
{
    "publicKey": "-----BEGIN RSA PUBLIC KEY----- ... -----END RSA PUBLIC KEY-----\n",
    "certificationEntity": "Issuer",
    "certifiedEntity": "Receiver",
    "data": "Text to certify",
    "timestamp": "Thu Jun 24 2021 20:40:12 GMT+0200 (hora de verano de Europa central)",
    "verificationAddress": "",
    "signature": "..."
}
```

#### Response

A boolean is returned as a result.

If there's a verification address, and the public key verification process fails, the certificate is considered not valid, and  `false` is returned.

```json
{
    "success": true,
    "data": false
}
```