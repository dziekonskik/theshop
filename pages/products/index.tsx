import { InferGetStaticPropsType } from "next";
import { ProductsGrid } from "../../components/ProductsGrid";
import type { StoreApiResponse } from "../../util/types";

const ProductsPage = ({
  data,
  pagesTotal,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <ProductsGrid data={data} pagesTotal={pagesTotal} />;
};

export const getStaticProps = async () => {
  const res = await fetch(
    "https://naszsklep-api.vercel.app/api/products?take=25&offset=0"
  );
  const data: StoreApiResponse[] = await res.json();
  const allItemsQuery = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=10000000&offset=0`
  );
  const allItemsData: StoreApiResponse[] = await allItemsQuery.json();

  return {
    props: {
      data,
      pagesTotal: Math.round(allItemsData.length / 25),
    },
  };
};

export default ProductsPage;
