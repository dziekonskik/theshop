import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "342gek",
  chromeWebSecurity: false,
  env: {
    login: "testUser@theshop.com",
    password: "testing123",
    HYGRAPH_CONTENT_API:
      "https://api-eu-central-1.hygraph.com/v2/cl1b4qfmc0wkf01xm8fj82g4s/master",
  },
  e2e: {
    setupNodeEvents(on, config) {
      config.baseUrl = "http://localhost:3000/";
      return config;
    },
  },
});
