using Xunit;
using OpenQA.Selenium.Appium.Windows;
using Xunit.Abstractions;

namespace VinCalcAutomation
{
    public class StandardCalculatorTests : CalculatorSession
    {

        private readonly ITestOutputHelper output;

        public StandardCalculatorTests(ITestOutputHelper output)
        {
            this.output = output;
        }

        [Fact]
        public void AdditionTest()
        {
            WindowsElement num1 = session?.FindElementByName("One") ?? throw new InvalidOperationException("Session is not initialized.");
            num1.Click();
            WindowsElement plus = session.FindElementByName("Plus");
            plus.Click();
            WindowsElement num2 = session.FindElementByName("Seven");
            num2.Click();
            WindowsElement equals = session.FindElementByName("Equals");
            equals.Click();

            WindowsElement result = session.FindElementByAccessibilityId("CalculatorResults"); 

            try
            {
                Assert.Equal("Display is 8", result.Text);
                output.WriteLine("Test PASSED!");

            } catch (Exception) 
            {
                output.WriteLine("Test FAILED!");
                throw; 
            }            
        }

        [Fact]
        public void SubtractionTest()
        {
            WindowsElement num1 = session?.FindElementByName("Nine") ?? throw new InvalidOperationException("Session is not initialized.");
            num1.Click();
            WindowsElement minus = session.FindElementByName("Minus");
            minus.Click();
            WindowsElement num2 = session.FindElementByName("Five");
            num2.Click();
            WindowsElement equals = session.FindElementByName("Equals");
            equals.Click();

            WindowsElement result = session.FindElementByAccessibilityId("CalculatorResults");
  
            try
            {
                Assert.Equal("Display is 4", result.Text);
                output.WriteLine("Test PASSED!");

            }
            catch (Exception)
            {
                output.WriteLine("Test FAILED!");
                throw;
            }
        }

        [Fact]
        public void MultiplicationTest()
        {
            WindowsElement num1 = session?.FindElementByName("Three") ?? throw new InvalidOperationException("Session is not initialized.");
            num1.Click();
            WindowsElement multiply = session.FindElementByName("Multiply by");
            multiply.Click();
            WindowsElement num2 = session.FindElementByName("Four");
            num2.Click();
            WindowsElement equals = session.FindElementByName("Equals");
            equals.Click();

            WindowsElement result = session.FindElementByAccessibilityId("CalculatorResults");
       
            try
            {
                Assert.Equal("Display is 12", result.Text);
                output.WriteLine("Test PASSED!");

            }
            catch (Exception)
            {
                output.WriteLine("Test FAILED!");
                throw;
            }
        }

        [Fact]
        public void DivisionTest()
        {
            WindowsElement num1 = session?.FindElementByName("Eight") ?? throw new InvalidOperationException("Session is not initialized.");
            num1.Click();
            WindowsElement divide = session.FindElementByName("Divide by");
            divide.Click();
            WindowsElement num2 = session.FindElementByName("Two");
            num2.Click();
            WindowsElement equals = session.FindElementByName("Equals");
            equals.Click();

            WindowsElement result = session.FindElementByAccessibilityId("CalculatorResults");
         
            try
            {
                Assert.Equal("Display is 4", result.Text);
                output.WriteLine("Test PASSED!");

            }
            catch (Exception)
            {
                output.WriteLine("Test FAILED!");
                throw;
            }
        }

        [Fact]
        public void AdditionThenMultiplicationTest()
        {
            WindowsElement num1 = session?.FindElementByName("Two") ?? throw new InvalidOperationException("Session is not initialized.");
            num1.Click();
            WindowsElement plus = session.FindElementByName("Plus");
            plus.Click();
            WindowsElement num2 = session.FindElementByName("Three");
            num2.Click();
            WindowsElement equals = session.FindElementByName("Equals");
            equals.Click();

            WindowsElement multiply = session.FindElementByName("Multiply by");
            multiply.Click();
            WindowsElement num3 = session.FindElementByName("Four");
            num3.Click();
            equals.Click();

            WindowsElement result = session.FindElementByAccessibilityId("CalculatorResults");
          
            try
            {
                Assert.Equal("Display is 20", result.Text);
                output.WriteLine("Test PASSED!");

            }
            catch (Exception)
            {
                output.WriteLine("Test FAILED!");
                throw;
            }
        }

        [Fact]
        public void DivisionThenSubtractionTest()
        {
            WindowsElement num1 = session?.FindElementByName("Nine") ?? throw new InvalidOperationException("Session is not initialized.");
            num1.Click();
            WindowsElement divide = session.FindElementByName("Divide by");
            divide.Click();
            WindowsElement num2 = session.FindElementByName("Three");
            num2.Click();
            WindowsElement equals = session.FindElementByName("Equals");
            equals.Click();

            WindowsElement minus = session.FindElementByName("Minus");
            minus.Click();
            WindowsElement num3 = session.FindElementByName("One");
            num3.Click();
            equals.Click();

            WindowsElement result = session.FindElementByAccessibilityId("CalculatorResults");
           
            try
            {
                Assert.Equal("Display is 2", result.Text);
                output.WriteLine("Test PASSED!");

            }
            catch (Exception)
            {
                output.WriteLine("Test FAILED!");
                throw;
            }
        }

        [Fact]
        public void SquareRootTest()
        {
            WindowsElement num1 = session?.FindElementByName("Nine") ?? throw new InvalidOperationException("Session is not initialized.");
            num1.Click();
            WindowsElement sqrt = session.FindElementByName("Square root");
            sqrt.Click();

            WindowsElement result = session.FindElementByAccessibilityId("CalculatorResults");

            try
            {
                Assert.Equal("Display is 3", result.Text);
                output.WriteLine("Test PASSED!");

            }
            catch (Exception)
            {
                output.WriteLine("Test FAILED!");
                throw;
            }
        }

        [Fact]
        public void PercentageTest()
        {
            // Enter number 100
            WindowsElement num1 = session?.FindElementByName("One") ?? throw new InvalidOperationException("Session is not initialized.");
            num1.Click();
            WindowsElement zero = session.FindElementByName("Zero");
            zero.Click();
            zero.Click();

            // Multiply by 50
            WindowsElement multiply = session.FindElementByName("Multiply by");
            multiply.Click();
            WindowsElement num2 = session.FindElementByName("Five");
            num2.Click();
            zero.Click();

            // Divide by 100
            WindowsElement divide = session.FindElementByName("Divide by");
            divide.Click();
            num1.Click();
            zero.Click();
            zero.Click();

            // Calculate the result
            WindowsElement equals = session.FindElementByName("Equals");
            equals.Click();

            WindowsElement result = session.FindElementByAccessibilityId("CalculatorResults");
            string resultText = result.Text;

            // Check if the result matches the expected format
            bool isResultCorrect = resultText == "Display is 50";
                 
            try
            {
                Assert.True(isResultCorrect, $"Unexpected result: {resultText}");
                output.WriteLine("Test PASSED!");

            }
            catch (Exception)
            {
                output.WriteLine("Test FAILED!");
                throw;
            }
        }

        [Fact]
        public void DecimalAdditionTest()
        {
            WindowsElement num1 = session?.FindElementByName("One") ?? throw new InvalidOperationException("Session is not initialized.");
            num1.Click();
            WindowsElement decimalPoint = session.FindElementByName("Decimal separator");
            decimalPoint.Click();
            WindowsElement num2 = session.FindElementByName("Five");
            num2.Click();
            WindowsElement plus = session.FindElementByName("Plus");
            plus.Click();
            WindowsElement num3 = session.FindElementByName("Two");
            num3.Click();
            decimalPoint.Click();
            WindowsElement num4 = session.FindElementByName("Five");
            num4.Click();
            WindowsElement equals = session.FindElementByName("Equals");
            equals.Click();

            WindowsElement result = session.FindElementByAccessibilityId("CalculatorResults");
      
            try
            {
                Assert.Equal("Display is 4", result.Text);
                output.WriteLine("Test PASSED!");

            }
            catch (Exception)
            {
                output.WriteLine("Test FAILED!");
                throw;
            }
        }

        [Fact]
        public void LargeNumberMultiplicationTest()
        {
            WindowsElement num1 = session?.FindElementByName("One") ?? throw new InvalidOperationException("Session is not initialized.");
            num1.Click();
            for (int i = 0; i < 5; i++)
            {
                WindowsElement zero = session.FindElementByName("Zero");
                zero.Click();
            }
            WindowsElement multiply = session.FindElementByName("Multiply by");
            multiply.Click();
            WindowsElement num2 = session.FindElementByName("Two");
            num2.Click();
            for (int i = 0; i < 4; i++)
            {
                WindowsElement zero = session.FindElementByName("Zero");
                zero.Click();
            }
            WindowsElement equals = session.FindElementByName("Equals");
            equals.Click();

            WindowsElement result = session.FindElementByAccessibilityId("CalculatorResults");
            string resultText = result.Text;

            try
            {
                // Check if the result is in scientific notation, and if so, convert it to a double and compare with the expected value
                if (resultText.StartsWith("Display is ") && double.TryParse(resultText.Substring(11), out double resultValue))
                {
                    Assert.Equal(2_000_000_000, resultValue, 0);
                }
                else
                {
                    Assert.Equal("Display is 2000000000", resultText);
                }
                output.WriteLine("Test PASSED!");
            }
            catch (Exception)
            {
                output.WriteLine("Test FAILED!");
                throw;
            }
        }
    }
}