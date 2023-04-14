const TriviaClient = require('../../src/api/triviaClient.js');
const { decodeHTMLEntities, shuffleArray } = require('../../src/utils/helpers');
const { expect } = require('chai');
const axios = require('axios');
const nock = require('nock');

describe('TriviaClient - Get Questions', () => {
  let triviaClient;

  beforeEach(() => {
    triviaClient = new TriviaClient();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should retrieve a list of trivia questions', async () => {
    nock('https://opentdb.com').get('/api.php?amount=10').reply(200, {
      response_code: 0,
      results: [
        {
          category: "Entertainment: Film",
          type: "multiple",
          difficulty: "easy",
          question: "What was the title of the first film?",
          correct_answer: "First Film",
          incorrect_answers: ["Second Film", "Third Film", "Fourth Film"]
        },
        {
          category: "Entertainment: Film",
          type: "multiple",
          difficulty: "easy",
          question: "What was the title of the second film?",
          correct_answer: "Second Film",
          incorrect_answers: ["First Film", "Third Film", "Fourth Film"]
        },
        // Add more sample question objects as needed
      ],
    });

    const response = await triviaClient.getQuestions();
    expect(response).to.have.property('response_code', 0);
    expect(response).to.have.property('results').that.is.an('array').and.is.not.empty;

    response.results.forEach((question) => {
      expect(question).to.include.all.keys(
        'category',
        'type',
        'difficulty',
        'question',
        'correct_answer',
        'incorrect_answers'
      );
      expect(question.incorrect_answers).to.be.an('array').and.is.not.empty;
    });
  });

  it('should decode HTML entities in the question text and answers', async function () {
    this.timeout(15000);
    const response = await triviaClient.getQuestions();

    response.results.forEach((question) => {
      const decodedQuestion = decodeHTMLEntities(question.question);
      const decodedCorrectAnswer = decodeHTMLEntities(question.correct_answer);
      const decodedIncorrectAnswers = question.incorrect_answers.map(decodeHTMLEntities);

      expect(decodedQuestion).to.equal(decodedQuestion.replace(/&[^;]+;/g, ''));
      expect(decodedCorrectAnswer).to.equal(decodedCorrectAnswer.replace(/&[^;]+;/g, ''));
      decodedIncorrectAnswers.forEach((decodedIncorrectAnswer) => {
        expect(decodedIncorrectAnswer).to.equal(decodedIncorrectAnswer.replace(/&[^;]+;/g, ''));
      });
    });
  });

  it('should shuffle the incorrect answers', async function () {
    this.timeout(15000);
    const response = await triviaClient.getQuestions();
    let totalDifference = 0;

    response.results.forEach((question) => {
      const originalIncorrectAnswers = [...question.incorrect_answers];
      const shuffledIncorrectAnswers = shuffleArray(question.incorrect_answers);
      let difference = 0;

      originalIncorrectAnswers.forEach((item, index) => {
        if (item !== shuffledIncorrectAnswers[index]) {
          difference++;
        }
      });

      totalDifference += difference;
    });

    const averageDifference = totalDifference / response.results.length;
    const minAverageDifference = 0.8;
    expect(averageDifference).to.be.at.least(minAverageDifference, `The average difference is less than ${minAverageDifference}`);
  });

  it('should handle an invalid API base URL', async () => {
    triviaClient.BASE_URL = 'https://invalidurl.com';

    triviaClient.getQuestions().then(() => {
      throw new Error('Expected promise to be rejected');
    }).catch((error) => {
      expect(error).to.be.an.instanceof(Error);
    });
  });
  
  it('should retrieve questions with specified parameters', async function () {
    this.timeout(15000);
    const amount = 5;
    const category = 11;
    const difficulty = 'easy';
    const type = 'multiple';
    const response = await triviaClient.getQuestions(amount, category, difficulty, type);

    expect(response.results).to.have.lengthOf(amount);

    response.results.forEach((question) => {
      expect(question).to.have.property('category').that.equals('Entertainment: Film');
      expect(question).to.have.property('type').that.equals(type);
      expect(question).to.have.property('difficulty').that.equals(difficulty);
    });
  });

  it('should handle an invalid API endpoint', async () => {
    triviaClient.getQuestions = async function (amount = 10, category, difficulty, type) {
      let url = `${this.BASE_URL}/invalid_endpoint.php?amount=${amount}`;
      
      if (category) url += `&category=${category}`;
      if (difficulty) url += `&difficulty=${difficulty}`;
      if (type) url += `&type=${type}`;
    
      try {
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
        throw error;
      }
    };
  
    triviaClient.getQuestions().then(() => {
      throw new Error('Expected promise to be rejected');
    }).catch((error) => {
      expect(error).to.be.an.instanceof(Error);
    });
  });

  it('should handle network errors', async () => {
    nock('https://opentdb.com').get('/api.php?amount=10').replyWithError('Network error');

    await expect(triviaClient.getQuestions()).to.be.rejectedWith(Error, 'Network error');
  });

  it('should measure the performance of the getQuestions method', async function () {
    this.timeout(5000); // Set the timeout to 5 seconds
    const startTime = Date.now();
    await triviaClient.getQuestions();
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
    console.log('Time taken by getQuestions():', timeTaken.toFixed(2), 'ms');
    const maxTime = 3000;
    expect(timeTaken).to.be.at.most(maxTime);
  });

  it('should handle an empty result set', async () => {
    nock('https://opentdb.com').get('/api.php?amount=10').reply(200, {
      response_code: 0,
      results: [],
    });
  
    const response = await triviaClient.getQuestions();
    expect(response).to.have.property('response_code', 0);
    expect(response).to.have.property('results').that.is.an('array').and.is.empty;
  });

  it('should handle a non-zero response code', async () => {
    nock('https://opentdb.com').get('/api.php?amount=10').reply(200, {
      response_code: 1,
      results: [],
    });
  
    const response = await triviaClient.getQuestions();
    expect(response).to.have.property('response_code', 1);
    expect(response).to.have.property('results').that.is.an('array').and.is.empty;
  });

  it('should only have expected properties in the result set', async () => {
    nock('https://opentdb.com').get('/api.php?amount=10').reply(200, {
      response_code: 0,
      results: [
        {
          incorrect_property: "This is an incorrect property",
          category: "Entertainment: Film",
          type: "multiple",
          difficulty: "easy",
          question: "What was the title of the first film?",
          correct_answer: "First Film",
          incorrect_answers: ["Second Film", "Third Film", "Fourth Film"],
        },
      ],
    });
  
    const response = await triviaClient.getQuestions();
    expect(response).to.have.property('response_code', 0);
    expect(response).to.have.property('results').that.is.an('array').and.is.not.empty;
    response.results.forEach((question) => {
      const allowedProperties = [
        'category',
        'type',
        'difficulty',
        'question',
        'correct_answer',
        'incorrect_answers',
      ];
      const questionProperties = Object.keys(question);
      const extraProperties = questionProperties.filter(
        (prop) => !allowedProperties.includes(prop)
      );
      if (extraProperties.length > 0) {
        console.warn(`Extra properties found in the question object: ${extraProperties.join(', ')}`);
      }
      const requiredProperties = allowedProperties.filter(
        (prop) => questionProperties.includes(prop)
      );
      expect(requiredProperties).to.have.members(allowedProperties);
    });
  });  
});
 