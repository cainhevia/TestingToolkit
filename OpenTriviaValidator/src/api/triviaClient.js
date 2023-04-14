// Required Libraries
const axios = require('axios');

// Constants
const BASE_URL = 'https://opentdb.com';

// TriviaClient Class

class TriviaClient {
  // Method to fetch trivia questions
  async getQuestions(amount = 10, category, difficulty, type) {
    // Build the URL for the API request using the provided parameters
    let url = `${BASE_URL}/api.php?amount=${amount}`;
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    if (type) url += `&type=${type}`;

    // Make the API request and handle errors
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching trivia questions:', error);
      throw error;
    }
  }

  // Method to fetch trivia categories
  async getCategories() {
    // Build the URL for the API request
    const url = `${BASE_URL}/api_category.php`;

    // Make the API request and handle errors
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching trivia categories:', error);
      throw error;
    }
  }
}

// Export TriviaClient Class
module.exports = TriviaClient;
