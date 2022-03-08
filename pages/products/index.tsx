import { InferGetStaticPropsType } from "next";
import { ProductsGrid } from "../../components/ProductsGrid";
import type { StoreApiResponse } from "../../util/types";

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <ProductsGrid data={data} />;
};

export const getStaticProps = async () => {
  const res = await fetch(
    "https://naszsklep-api.vercel.app/api/products?take=25&offset=0"
  );
  const data: StoreApiResponse[] = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default ProductsPage;
