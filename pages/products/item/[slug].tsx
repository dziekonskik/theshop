import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { serialize } from "next-mdx-remote/serialize";
import { ProductDetails } from "../../../components/Product/ProductDetails";
import { apolloClient } from "../../../graphql/apolloClient";
import type { InferGetStaticPaths } from "../../../util/types";
import {
  GetProductBySlugDocument,
  GetProductBySlugQuery,
  GetProductSlugsDocument,
  GetProductSlugsQuery,
  GetProductBySlugQueryVariables,
} from "../../../generated/graphql";

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading...</div>;
  }
  if (!data || !data.product) {
    return <div>Ups coś poszło nie tak...</div>;
  }

  return (
    <div>
      <Link href={"/products"}>
        <a className="shadow-sm border-indigo-500 bg-indigo-600 text-white p-4 mb-14">
          Wróć na stronę główną
        </a>
      </Link>
      <ProductDetails
        data={{
          id: data.product.id,
          name: data.product.name,
          thumbnailAlt: data.product.name,
          thumbnailUrl: data.product.images[0].url,
          description: data.product.description,
          longDescription: data.longDescription,
          rating: 5,
          slug: data.product.slug,
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
      data: {
        ...data,
        longDescription: await serialize(data.product.description),
      },
    },
  };
};
