import { InferGetStaticPropsType } from "next";
import { ProductsGrid } from "../../components/ProductsGrid";
import { fetchProductsData } from "../../util/functions";
import { PRODUCTS_PER_PAGE } from "../../util/constants";

const ProductsPage = ({
  data,
  pagesTotal,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <ProductsGrid data={data} pagesTotal={pagesTotal} />;
};

export const getStaticProps = async () => {
  const { data, allItemsData } = await fetchProductsData(0, PRODUCTS_PER_PAGE);

  return {
    props: {
      data,
      pagesTotal: Math.round(allItemsData.length / 25),
    },
  };
};

export default ProductsPage;
