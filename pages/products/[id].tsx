import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { ProductDetails } from "../../components/Product";

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!data) {
    return <div>Ups coś poszło nie tak...</div>;
  }
  return (
    <div>
      <Link href={"/products"}>
        <a>Wróć na stronę główną</a>
      </Link>
      <ProductDetails
        data={{
          id: data.id,
          title: data.title,
          thumbnailAlt: data.title,
          thumbnailUrl: data.image,
          description: data.description,
          rating: data.rating.rate,
        }}
      />
    </div>
  );
};

export default ProductIdPage;

interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const getStaticPaths = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data: StoreApiResponse[] = await res.json();
  return {
    paths: data.map((product) => ({
      params: { id: product.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.id) {
    return {
      props: {},
      notFound: true,
    };
  }
  const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
  const data: StoreApiResponse | null = await res.json();

  return {
    props: {
      data,
    },
  };
};
