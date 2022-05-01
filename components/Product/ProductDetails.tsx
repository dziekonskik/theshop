import Image from "next/image";
import { NextSeo } from "next-seo";
import { Rating } from "./ProductRating";
import { ProductReviewForm } from "../Forms/ProductReviewForm";
import { ZaisteReactMarkdown } from "../ZaisteReactMarkdown";
import type { MarkdownResult } from "../../util/types";

export interface ProductDetails {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  longDescription: MarkdownResult;
  rating: number;
  slug: string;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <NextSeo
        title={data.name}
        description={data.description}
        canonical={`https://theshop-nu.vercel.app/products/${data.slug}`}
        openGraph={{
          url: `https://theshop-nu.vercel.app/products/${data.slug}`,
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
      <div className="p-4 max-w-sm">
        <Rating rating={data.rating} />
        <ProductReviewForm product={data.slug} />
      </div>
    </>
  );
};
