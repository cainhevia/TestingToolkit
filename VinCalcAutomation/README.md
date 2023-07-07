# VinCalcAutomation 🖥️🔢

**VinCalcAutomation** is a C# project that uses automation tests for a standard calculator application. This project provides a suite of automated test cases that are capable of testing various mathematical operations. 🚀

## Project Structure 🏗️

This project includes a main testing suite StandardCalculatorTests which tests the basic mathematical operations: addition, subtraction, multiplication, and division. It also includes a test for the square root operation, percentage calculation, decimal addition, and large number multiplication. 🧪

The main class for the project is CalculatorSession, which initializes the session with the calculator application and contains the necessary Dispose() method to end the session after the tests are completed. 👨‍💻

## Test Cases 🧾

Each test case starts with initializing the session object from the CalculatorSession class, after which various calculator operations are performed. The result of these operations is then compared with the expected result using the Assert.Equal() function provided by the Xunit library. 📝

## Conclusion 🏁

VinCalcAutomation provides a foundation for developing more complex automation tests. The project is easily extendable and can be adapted for testing other applications. Happy testing! 😃