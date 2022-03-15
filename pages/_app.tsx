import "../styles/globals.css";
import "../styles/styles.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { DefaultSeo } from "next-seo";
import { Layout } from "../components/layout/Layout";
import SEO from "../next-seo.config";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <DefaultSeo {...SEO} />
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Layout>
  );
}
export default MyApp;
