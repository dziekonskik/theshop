import { useState, useEffect } from "react";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { Rating } from "./ProductRating";
import { ButtonWithIcon } from "../ButtonsAndLinks/ButtonWithIcon";
import { ProductQuantityWidget } from "../Product/ProductQuantityWidget";
import { useCartState } from "../Cart/CartContext";
import { ProductReviewContainer } from "../ProductReview/ProductReviewContainer";
import { ZaisteReactMarkdown } from "../ZaisteReactMarkdown";
import { ProductDetailsFragment } from "../../generated/graphql";
import { CartIcon } from "../Svg";
import useMediaQuery from "../../util/useMediaquery";
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
  const [isMobile, setIsMobile] = useState(false);
  const { addItemToCart, clickedItemSlug } = useCartState();
  const matches = useMediaQuery("(max-width: 1023px)");

  useEffect(() => {
    if (matches) setIsMobile(true);
  }, [matches]);

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
      <div className="px-4 font-comfortaa">
        <div className="flex gap-7 flex-col md:flex-row">
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
            <h2 className="text-3xl font-bold text-center lg:text-start">
              {product.name}
            </h2>
            <article className="prose lg:prose-xl my-6 text-center lg:text-start">
              <ZaisteReactMarkdown>
                {product.longDescription}
              </ZaisteReactMarkdown>
            </article>
            <div className="flex flex-col items-center lg:items-start">
              <ProductQuantityWidget
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <ButtonWithIcon
                onClick={() => addItemToCart(cartItem)}
                disabled={clickedItemSlug === product.slug}
                bgColor="#6C63FF"
                type="button"
                fullWidth={isMobile}
                side="right"
                svgMarkup={<CartIcon className="w-6 h-6" />}
              >
                To cart
              </ButtonWithIcon>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center px-4 font-anonymous mt-4">
        <span className="mr-2">Other users rated this product for</span>
        <Rating rating={product.rating} />
      </div>
      <ProductReviewContainer slug={product.slug} />
    </>
  );
};
