import Image from "next/image";
import { NextSeo } from "next-seo";
import { Rating } from "./ProductRating";
import { AddToCartButton } from "../AddToCartButton";
import { useCartState } from "../Cart/CartContext";
import { ProductReviewContainer } from "../ProductReview/ProductReviewContainer";
import { ZaisteReactMarkdown } from "../ZaisteReactMarkdown";
import { ProductDetailsFragment } from "../../generated/graphql";
import type { MarkdownResult } from "../../util/types";

export interface ProductDetails extends ProductDetailsFragment {
  longDescription: MarkdownResult;
  rating: number;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  const { mutateOrder, handledItemSlug } = useCartState();
  const orderItem = {
    quantity: 1,
    product: {
      name: data.name,
      price: data.price,
      slug: data.slug,
      images: data.images,
      description: data.description,
    },
  };
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
              url: data.images[0].url,
              alt: data.name,
              type: "image/jpeg",
            },
          ],
          site_name: "The Shop",
        }}
      />
      <div className="bg-white p-4">
        <div className="flex gap-7">
          <div className="h-96 w-96">
            <Image
              src={data.images[0].url}
              alt={data.name}
              layout="responsive"
              objectFit="fill"
              width="100%"
              height="100%"
            />
          </div>
          <div className="p-4">
            <h2 className="text-3xl font-bold">{data.name}</h2>
            <article className="prose lg:prose-xl my-6">
              <ZaisteReactMarkdown>{data.longDescription}</ZaisteReactMarkdown>
            </article>
            <AddToCartButton
              onClick={() => mutateOrder(orderItem)}
              disabled={handledItemSlug === orderItem.product.slug}
            />
          </div>
        </div>
      </div>
      <Rating rating={data.rating} />
      <ProductReviewContainer slug={data.slug} />
    </>
  );
};
