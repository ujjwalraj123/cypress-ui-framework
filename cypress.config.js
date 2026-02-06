const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const fs = require("fs"); 
const path = require("path");


module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",
    specPattern: "cypress/e2e/**/*.cy.js",
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: false,
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      on("before:run", (details) => {
        const resultsPath = path.resolve(__dirname, "allure-results");

        if (!fs.existsSync(resultsPath)) {
          fs.mkdirSync(resultsPath, { recursive: true });
        }

        const envContent = `BaseUrl=${config.baseUrl}\nBrowser=${
          details.browser?.displayName || "N/A"
        }\nEnvironment=UAT`;
        fs.writeFileSync(
          path.join(resultsPath, "environment.properties"),
          envContent
        );

        const executorContent = {
          name: "Ujjwal Raj",
          type: "jenkins",
          buildName: "cypress-UI-framework-" + Date.now(),
        };
        fs.writeFileSync(
          path.join(resultsPath, "executor.json"),
          JSON.stringify(executorContent)
        );
      });

      on("after:spec", (spec, results) => {
        
      });

      on("task", {
        appendToFile({ fileName, data }) {
          const content = JSON.stringify(data, null, 2) + ",\n";
          fs.appendFileSync(fileName, content);
          return null;
        },
      });

      return config;
    },
  },
});