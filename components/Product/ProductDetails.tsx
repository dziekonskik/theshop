import { useState } from "react";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { Rating } from "./ProductRating";
import { AddToCartButton } from "../ButtonsAndLinks/AddToCartButton";
import { ProductQuantityWidget } from "../Product/ProductQuantityWidget";
import { useCartState } from "../Cart/CartContext";
import { ProductReviewContainer } from "../ProductReview/ProductReviewContainer";
import { ZaisteReactMarkdown } from "../ZaisteReactMarkdown";
import { ProductDetailsFragment } from "../../generated/graphql";
import type { MarkdownResult, CartItem } from "../../util/types";

export interface ProductDetails extends ProductDetailsFragment {
  longDescription: MarkdownResult;
  rating: number;
}

interface ProductProps {
  product: ProductDetails;
}

export const ProductDetails = ({ product }: ProductProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart, clickedItemSlug } = useCartState();

  const cartItem: CartItem = {
    id: "",
    quantity,
    product: {
      name: product.name,
      price: product.price,
      slug: product.slug,
      images: product.images,
    },
  };
  return (
    <>
      <NextSeo
        title={product.name}
        description={product.description}
        canonical={`https://theshop-nu.vercel.app/products/${product.slug}`}
        openGraph={{
          url: `https://theshop-nu.vercel.app/products/${product.slug}`,
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0].url,
              alt: product.name,
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
              src={product.images[0].url}
              alt={product.name}
              layout="responsive"
              objectFit="fill"
              width="100%"
              height="100%"
            />
          </div>
          <div className="p-4">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <article className="prose lg:prose-xl my-6">
              <ZaisteReactMarkdown>
                {product.longDescription}
              </ZaisteReactMarkdown>
            </article>
            <ProductQuantityWidget
              quantity={quantity}
              setQuantity={setQuantity}
            />
            <AddToCartButton
              onClick={() => addItemToCart(cartItem)}
              disabled={clickedItemSlug === product.slug}
            />
          </div>
        </div>
      </div>
      <Rating rating={product.rating} />
      <ProductReviewContainer slug={product.slug} />
    </>
  );
};
