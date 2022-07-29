import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { serialize } from "next-mdx-remote/serialize";
import { ProductDetails } from "../../../components/Product/ProductDetails";
import { apolloClient } from "../../../graphql/apolloClient";
import {
  GetProductBySlugDocument,
  GetProductBySlugQuery,
  GetProductSlugsDocument,
  GetProductSlugsQuery,
  GetProductBySlugQueryVariables,
} from "../../../generated/graphql";
import { Link } from "../../../components/ButtonsAndLinks/Link";
import type { InferGetStaticPaths } from "../../../util/types";

const ProductIdPage = ({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading...</div>;
  }
  if (!product?.slug) {
    return <div>Ups coś poszło nie tak...</div>;
  }

  return (
    <div>
      <Link href={"/products"} bgColor="#F4F3FF">
        Go back
      </Link>
      <ProductDetails
        product={{
          ...product,
          rating: 5,
        }}
      />
    </div>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const { data } = await apolloClient.query<GetProductSlugsQuery>({
    query: GetProductSlugsDocument,
  });

  return {
    paths: data.products.map((product) => ({ params: { slug: product.slug } })),
    fallback: "blocking",
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.slug) {
    return {
      props: {},
      notFound: true,
    };
  }

  const { data } = await apolloClient.query<
    GetProductBySlugQuery,
    GetProductBySlugQueryVariables
  >({
    variables: {
      slug: params.slug,
    },
    query: GetProductBySlugDocument,
  });

  if (!data.product) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      product: {
        ...data.product,
        longDescription: await serialize(data.product.description),
      },
    },
  };
};
