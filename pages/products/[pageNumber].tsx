import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { ProductsGrid } from "../../components/ProductsGrid";
import { PRODUCTS_PER_PAGE } from "../../util/constants";
import { fetchProductsData } from "../../util/functions";
import type { InferGetStaticPaths } from "../../util/types";

const ProductsPage = ({
  data,
  pagesTotal,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading...</div>;
  }
  return <ProductsGrid data={data} pagesTotal={pagesTotal} />;
};

export const getStaticPaths = async () => {
  const paths = Array.from({ length: 168 }, (_, i) => ({
    params: { pageNumber: (i + 1).toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  const currentPage = +(params?.pageNumber || 0);

  const { data, allItemsData } = await fetchProductsData(
    currentPage,
    PRODUCTS_PER_PAGE
  );

  return {
    props: {
      data,
      pagesTotal: Math.ceil(allItemsData.length / 25) - 1,
    },
  };
};

export default ProductsPage;
