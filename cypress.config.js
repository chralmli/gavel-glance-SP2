import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {

    },
    specPattern: 'cypress/e2e/**/*.spec.js',
  },
});
