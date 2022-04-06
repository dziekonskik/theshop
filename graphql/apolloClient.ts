import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api-eu-central-1.graphcms.com/v2/cl1b4qfmc0wkf01xm8fj82g4s/master",
  cache: new InMemoryCache(),
});
