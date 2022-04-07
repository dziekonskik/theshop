import "../styles/globals.css";
import "../styles/styles.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloProvider } from "@apollo/client";
import { DefaultSeo } from "next-seo";
import { Layout } from "../components/layout/Layout";
import SEO from "../next-seo.config";
import { CartContextProvider } from "../components/Cart/CartContext";
import { apolloClient } from "../graphql/apolloClient";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <CartContextProvider>
        <Layout>
          <DefaultSeo {...SEO} />
          <QueryClientProvider client={client}>
            <Component {...pageProps} />
          </QueryClientProvider>
        </Layout>
      </CartContextProvider>
    </ApolloProvider>
  );
}
export default MyApp;
