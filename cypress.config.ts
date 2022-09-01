import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "342gek",
  e2e: {
    setupNodeEvents(on, config) {
      config.baseUrl = "http://localhost:3000/";
      return config;
    },
  },
});
