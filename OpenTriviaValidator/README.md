# OpenTriviaValidator 📚

**OpenTriviaValidator** is an automated testing tool for the Open Trivia API. It is built using Node.js and is designed to validate the API's functionality and performance.

## Installation 🔧

To install the project, follow these steps:

1. Clone the repository:
git clone https://github.com/cainhevia/TestingToolkit.git

2. Change into the project directory:
cd OpenTriviaValidator

3. Install the dependencies:
npm install

## Usage 🚀

To run the tests, simply execute the following command:
npm test

This command will run the tests using Mocha and generate a report using the Mochawesome reporter. The report will be saved in the `reports` directory with the filename `my-report.html` and `my-report.json`.

## Dependencies 📦

- [axios](https://www.npmjs.com/package/axios) - Promise-based HTTP client for Node.js
- [he](https://www.npmjs.com/package/he) - HTML entity encoder/decoder
- [nock](https://www.npmjs.com/package/nock) - HTTP mocking and expectations library

## Dev Dependencies 🔧

- [chai](https://www.npmjs.com/package/chai) - BDD/TDD assertion library for Node.js
- [chai-as-promised](https://www.npmjs.com/package/chai-as-promised) - Chai plugin for working with Promises
- [mocha](https://www.npmjs.com/package/mocha) - Simple, flexible, fun test framework for Node.js
- [mochawesome](https://www.npmjs.com/package/mochawesome) - A Mocha reporter that generates an HTML/CSS report

## Contributing 💡

Please feel free to submit issues and pull requests to improve the project.