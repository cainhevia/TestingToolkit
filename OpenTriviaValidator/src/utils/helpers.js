// Required Libraries
const he = require('he');

// Utility Functions

// Function to decode HTML entities in a given text
function decodeHTMLEntities(text) {
  return he.decode(text);
}

// Function to shuffle the elements of an input array
function shuffleArray(array) {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Function to compare arrays for equality
function arraysEqual(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((val, index) => val === b[index]);
}

// Timeout-related Functions

// Function to set the custom timeout Promise
function createTimeoutPromise(testTimeout) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Test exceeded the timeout of ${testTimeout}ms`));
    }, testTimeout);
  });
}

// Function to get categories with a specified timeout
async function getCategoriesWithTimeout(triviaClient, timeout) {
  const timeoutPromise = createTimeoutPromise(timeout);
  const responsePromise = triviaClient.getCategories();
  return await Promise.race([responsePromise, timeoutPromise]);
}

// Export Functions
module.exports = {
  decodeHTMLEntities,
  shuffleArray,
  arraysEqual,
  createTimeoutPromise,
  getCategoriesWithTimeout,
};
