import { InferGetStaticPropsType } from "next";
import { ProductsGrid } from "../../components/ProductsGrid";
import type { InferGetStaticPaths, StoreApiResponse } from "../../util/types";

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <ProductsGrid data={data} />;
};

export const getStaticPaths = async () => {
  const paths = Array.from({ length: 10 }, (_, i) => ({
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
  const productsPerPage = 25;

  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=${productsPerPage}&offset=${
      currentPage * productsPerPage
    }`
  );
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default ProductsPage;
