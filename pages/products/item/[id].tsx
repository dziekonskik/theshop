import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { serialize } from "next-mdx-remote/serialize";
import { ProductDetails } from "../../../components/Product";
import type {
  InferGetStaticPaths,
  StoreApiResponse,
} from "../../../util/types";

const ProductIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading...</div>;
  }
  if (!data) {
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
          id: data.id,
          title: data.title,
          thumbnailAlt: data.title,
          thumbnailUrl: data.image,
          description: data.description,
          longDescription: data.longDescription,
          rating: data.rating.rate,
        }}
      />
    </div>
  );
};

export default ProductIdPage;

export const getStaticPaths = async () => {
  const res = await fetch(
    "https://naszsklep-api.vercel.app/api/products?take=25&offset=250"
  );
  const data: StoreApiResponse[] = await res.json();

  const paths = Array.from(
    { length: data[data.length - 1]?.id || 0 },
    (_, i) => ({
      params: { id: (i + 1).toString() },
    })
  );
  return {
    paths,
    fallback: "blocking",
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
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products/${params.id}`
  );
  const data: StoreApiResponse = await res.json();

  if (!data) {
    return {
      props: {},
      notFound: true,
    };
  }

  return {
    props: {
      data: {
        ...data,
        longDescription: await serialize(data.longDescription),
      },
    },
  };
};
