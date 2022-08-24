import { QueryClient, QueryClientProvider } from "react-query";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { DefaultSeo } from "next-seo";
import { Layout } from "../components/layout/Layout";
import { CartContextProvider } from "../components/Cart/CartContext";
import { apolloClient } from "../graphql/apolloClient";
import SEO from "../next-seo.config";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import "../styles/styles.css";

const client = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <CartContextProvider>
          <QueryClientProvider client={client}>
            <Layout>
              <DefaultSeo {...SEO} />
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </CartContextProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
export default MyApp;
