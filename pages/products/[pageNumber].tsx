import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { ProductsGrid } from "../../components/Product/ProductsGrid";
import { PRODUCTS_PER_PAGE } from "../../util/constants";
import type { InferGetStaticPaths } from "../../util/types";
import {
  GetProductListByPageDocument,
  GetProductListByPageQuery,
} from "../../generated/graphql";
import { apolloClient } from "../../graphql/apolloClient";

const ProductsPage = ({
  data,
  pagesTotal,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter();

  if (!data || !pagesTotal) {
    return <div>Something went wrong...</div>;
  }

  if (isFallback) {
    return <div>Loading...</div>;
  }
  return <ProductsGrid productsData={data} pagesTotal={100} />;
};

export const getStaticPaths = async () => {
  const paths = Array.from({ length: 20 }, (_, i) => ({
    params: { pageNumber: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.pageNumber) {
    return {
      props: {},
      notFound: true,
    };
  }
  const skipCount = +params.pageNumber * PRODUCTS_PER_PAGE;
  const { data } = await apolloClient.query<GetProductListByPageQuery>({
    query: GetProductListByPageDocument,
    variables: {
      skipCount,
    },
  });

  return {
    props: {
      data,
      pagesTotal: null,
    },
  };
};

export default ProductsPage;
