import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { Rating } from "./Rating";
import { ZaisteReactMarkdown } from "./ZaisteReactMarkdown";
import { useCartState } from "./Cart/CartContext";
import type { MarkdownResult } from "../util/types";

interface ProductDetails {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  longDescription: MarkdownResult;
  rating: number;
  slug: string;
}

type ProductListItem = Pick<
  ProductDetails,
  "name" | "thumbnailUrl" | "thumbnailAlt" | "id" | "slug"
>;

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <NextSeo
        title={data.name}
        description={data.description}
        canonical={`https://theshop-nu.vercel.app/products/${data.id}`}
        openGraph={{
          url: `https://theshop-nu.vercel.app/products/${data.id}`,
          title: data.name,
          description: data.description,
          images: [
            {
              url: data.thumbnailUrl,
              alt: data.thumbnailAlt,
              type: "image/jpeg",
            },
          ],
          site_name: "The Shop",
        }}
      />
      <div className="bg-white p-4">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout="responsive"
          objectFit="contain"
          width={16}
          height={9}
        />
      </div>
      <h2 className="p-4 text-3xl font-bold">{data.name}</h2>
      <p className="p-4">{data.description}</p>
      <article className="p-4 prose lg:prose-xl">
        <ZaisteReactMarkdown>{data.longDescription}</ZaisteReactMarkdown>
      </article>
      <div className="p-4">
        <Rating rating={data.rating} />
      </div>
    </>
  );
};

interface ProductListItemProps {
  data: ProductListItem;
}

export const ProductLstItem = ({ data }: ProductListItemProps) => {
  const { addItemToCart } = useCartState();

  return (
    <>
      <div className="bg-white p-4">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout="responsive"
          objectFit="contain"
          width={16}
          height={9}
        />
      </div>
      <div className="flex items-center">
        <Link href={`/products/item/${data.slug}`}>
          <a>
            <h2 className="p-4 text-3xl font-bold">{data.name}</h2>
          </a>
        </Link>
        <button
          onClick={() =>
            addItemToCart({
              id: data.id,
              price: 77.17,
              title: data.name,
              count: 1,
            })
          }
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Kup to
        </button>
      </div>
    </>
  );
};
