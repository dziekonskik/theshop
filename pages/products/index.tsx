import { InferGetStaticPropsType } from "next";
import { ProductsGrid } from "../../components/Product/ProductsGrid";
import { PRODUCTS_PER_PAGE } from "../../util/constants";
import { apolloClient } from "../../graphql/apolloClient";
import {
  GetProductListDocument,
  GetProductListQuery,
} from "../../generated/graphql";

const ProductsPage = ({
  data,
  pagesTotal,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return <ProductsGrid data={data} pagesTotal={pagesTotal} />;
};

export const getStaticProps = async () => {
  const { data } = await apolloClient.query<GetProductListQuery>({
    query: GetProductListDocument,
  });

  return {
    props: {
      data,
      pagesTotal: Math.ceil(data.products.length / PRODUCTS_PER_PAGE),
    },
  };
};

export default ProductsPage;
