import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { ProductsGrid } from "../../components/Product/ProductsGrid";
import { Link } from "../../components/ButtonsAndLinks/Link";
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
    return (
      <div className="px-4 flex justify-center">
        <div>
          <h3 className="font-comfortaa text-2xl mt-16 mb-9">
            Currently there is not enough products in the cart for another page
          </h3>
          <Link bgColor="#77aaFF" href="/products">
            Go back
          </Link>
        </div>
      </div>
    );
  }

  if (isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <ProductsGrid productsData={data["products"]} pagesTotal={pagesTotal} />
  );
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
      pagesTotal: Math.ceil(data.products.length / PRODUCTS_PER_PAGE),
      data,
    },
  };
};

export default ProductsPage;
