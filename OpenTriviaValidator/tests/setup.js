// Import the Chai assertion library
const chai = require('chai');
// Import the chai-as-promised plugin for handling promises with Chai
const chaiAsPromised = require('chai-as-promised');

// Configure Chai to use the chai-as-promised plugin
chai.use(chaiAsPromised);
// Set the global expect function to Chai's expect function
// This allows using expect in test files without importing it in each file
global.expect = chai.expect;
