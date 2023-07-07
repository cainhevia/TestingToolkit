using System.Diagnostics;
using OpenQA.Selenium.Appium;
using OpenQA.Selenium.Appium.Windows;
using Xunit;

namespace VinCalcAutomation
{
    public class CalculatorSession : IAsyncLifetime
    {
        private const string AppDriverUrl = "http://127.0.0.1:4723";
        private const string CalculatorAppId = "Microsoft.WindowsCalculator_8wekyb3d8bbwe!App";
        private static readonly string WinAppDriverExePath = GetWinAppDriverPath();

        protected static WindowsDriver<WindowsElement>? session;
        private static Process? winAppDriverProcess;

        public Task InitializeAsync()
        {
            if (session == null)
            {
                StartWinAppDriver();

                var appiumOptions = new AppiumOptions();
                appiumOptions.AddAdditionalCapability("app", CalculatorAppId);
                appiumOptions.AddAdditionalCapability("deviceName", "WindowsPC");

                session = new WindowsDriver<WindowsElement>(new Uri(AppDriverUrl), appiumOptions);
                session.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(5);

                try
                {
                    Assert.Equal("Standard", session.FindElementByAccessibilityId("Header").Text);

                } catch (Exception)
                {                    
                    SwitchCalculatorMode("Standard Calculator");

                }
            }

            return Task.CompletedTask;
        }

        public CalculatorSession()
        {
        }

        private static string GetWinAppDriverPath()
        {
            string primaryPath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles), @"Windows Application Driver\WinAppDriver.exe");
            string alternativePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.ProgramFilesX86), @"Windows Application Driver\WinAppDriver.exe");

            if (File.Exists(primaryPath))
            {
                return primaryPath;
            }
            else if (File.Exists(alternativePath))
            {
                return alternativePath;
            }
            else
            {
                throw new FileNotFoundException("WinAppDriver.exe not found in the expected locations. Please ensure it is installed correctly.");
            }
        }

        private void SwitchCalculatorMode(string mode)
        {
            WindowsElement hamburgerMenu = session?.FindElementByAccessibilityId("TogglePaneButton") ?? throw new InvalidOperationException("Session is not initialized.");
            hamburgerMenu.Click();

            WindowsElement modeButton = session.FindElementByName(mode);
            modeButton.Click();
        }

        private void StartWinAppDriver()
        {
            if (winAppDriverProcess == null)
            {
                winAppDriverProcess = new Process
                {
                    StartInfo = new ProcessStartInfo
                    {
                        FileName = WinAppDriverExePath,
                        UseShellExecute = true,
                        WindowStyle = ProcessWindowStyle.Hidden,
                    }
                };
                winAppDriverProcess.Start();
            }
        }

        public async Task DisposeAsync()
        {
            session?.Quit();
            session = null;

            StopWinAppDriver();

            await Task.CompletedTask;
        }

        private void StopWinAppDriver()
        {
            winAppDriverProcess?.Close();
            winAppDriverProcess = null;
        }
    }
}
