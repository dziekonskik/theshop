import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { Rating } from "./Rating";
import { ZaisteReactMarkdown } from "./ZaisteReactMarkdown";
import type { MarkdownResult } from "../util/types";

interface ProductDetails {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  longDescription: MarkdownResult;
  rating: number;
}

type ProductListItem = Pick<
  ProductDetails,
  "title" | "thumbnailUrl" | "thumbnailAlt" | "id"
>;

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <NextSeo
        title={data.title}
        description={data.description}
        canonical={`https://theshop-nu.vercel.app/products/${data.id}`}
        openGraph={{
          url: `https://theshop-nu.vercel.app/products/${data.id}`,
          title: data.title,
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
      <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
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
      <Link href={`/products/item/${data.id}`}>
        <a>
          <h2 className="p-4 text-3xl font-bold">{data.title}</h2>
        </a>
      </Link>
    </>
  );
};
