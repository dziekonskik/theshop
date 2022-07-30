import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: process.env.HYGRAPH_CONTENT_API,
  cache: new InMemoryCache(),
});

export const personAuthApolloClient = new ApolloClient({
  uri: process.env.HYGRAPH_CONTENT_API,
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${process.env.HYGRAPH_PERSON_TOKEN}`,
  },
});
