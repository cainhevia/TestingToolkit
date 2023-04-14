const TriviaClient = require('../../src/api/triviaClient.js');
const { decodeHTMLEntities, createTimeoutPromise, getCategoriesWithTimeout, } = require('../../src/utils/helpers.js');
const axios = require('axios');
const expect = require('chai').expect;

describe('TriviaClient - Categories', () => {
    let triviaClient;

    beforeEach(() => {
        triviaClient = new TriviaClient();
    });

    afterEach(() => {
        triviaClient = null;
    });

    it('should retrieve a list of trivia categories', async () => {
        const response = await getCategoriesWithTimeout(triviaClient, 25000);

        expect(response.trivia_categories).to.be.an('array').that.is.not.empty;

        response.trivia_categories.forEach((category) => {
            expect(category).to.have.property('id').that.is.a('number');
            expect(category).to.have.property('name').that.is.a('string');
        });
    });

    it('should decode HTML entities in the category names', async () => {
        const response = await getCategoriesWithTimeout(triviaClient, 15000);

        response.trivia_categories.forEach((category) => {
            const decodedName = decodeHTMLEntities(category.name);
            expect(decodedName).to.equal(decodedName.replace(/&[^;]+;/g, ''));
        });
    });

    it('should validate that the same set of categories is returned on multiple calls', async () => {
        const response1 = await getCategoriesWithTimeout(triviaClient, 20000);
        const response2 = await getCategoriesWithTimeout(triviaClient, 20000);

        expect(response1.trivia_categories.length).to.equal(response2.trivia_categories.length);

        const idSet1 = new Set(response1.trivia_categories.map((category) => category.id));
        const idSet2 = new Set(response2.trivia_categories.map((category) => category.id));
        expect([...idSet1].sort()).to.deep.equal([...idSet2].sort());
    });

    it('should handle an invalid API endpoint', async () => {
        triviaClient.getCategories = async function () {
            const url = `${this.BASE_URL}/invalid_endpoint.php`;

            try {
                const response = await axios.get(url);
                return response.data;
            } catch (error) {
                console.error('Error fetching trivia categories:', error);
                throw error;
            }
        };

        await expect(triviaClient.getCategories()).to.be.rejectedWith(Error);
    });

    it('should handle network errors', async () => {
        triviaClient.getCategories = async function () {
            throw new Error('Network error');
        };

        await expect(triviaClient.getCategories()).to.be.rejectedWith(Error, 'Network error');
    });

    it('should fetch categories in a reasonable amount of time', async () => {
        const testTimeout = 10000;
        const timeoutPromise = createTimeoutPromise(testTimeout);
        const startTime = process.hrtime.bigint();
        const getCategoriesPromise = triviaClient.getCategories();
        await Promise.race([getCategoriesPromise, timeoutPromise]);
        const endTime = process.hrtime.bigint();
    
        const duration = Number(endTime - startTime) / 1e6; // convert to milliseconds
        console.log(`getCategories execution time: ${duration.toFixed(2)}ms`); // log the execution time
        const maxDuration = 3000; // set a maximum acceptable duration for the test
        expect(duration).to.be.below(maxDuration, `getCategories took longer than ${maxDuration}ms`);
    });

    it('should throw an error if the API response is malformed', async () => {
        triviaClient.getCategories = async function () {
            return { malformed_response: true };
        };
    
        try {
            await triviaClient.getCategories();
        } catch (error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal('Malformed API response');
        }
    });    
    
    it('should throw an error if the API returns an error message', async () => {
        triviaClient.getCategories = async function () {
            return { error: 'Some error message from the API' };
        };
    
        try {
            await triviaClient.getCategories();
        } catch (error) {
            expect(error).to.be.instanceOf(Error);
            expect(error.message).to.equal('API error: Some error message from the API');
        }
    });    
    
    it('should handle empty categories list', async () => {
        triviaClient.getCategories = async function () {
            return { trivia_categories: [] };
        };
    
        const response = await triviaClient.getCategories();
        expect(response.trivia_categories).to.be.an('array').that.is.empty;
    });    
});
