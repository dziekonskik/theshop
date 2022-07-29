import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartState } from "../Cart/CartContext";
import { Button } from "../ButtonsAndLinks/Button";
import { ProductQuantityWidget } from "./ProductQuantityWidget";
import { EuroIcon, CartIcon } from "../Svg";
import type { ProductDetailsFragment } from "../../generated/graphql";
import type { CartItem } from "../../util/types";

interface ProductListItemProps {
  product: ProductDetailsFragment;
}

export const ProductLstItem = ({ product }: ProductListItemProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addItemToCart, clickedItemSlug } = useCartState();

  const orderItem: CartItem = {
    id: "",
    quantity,
    product: {
      name: product.name,
      price: product.price,
      slug: product.slug,
      images: product.images,
    },
  };

  const addToCartDisabled = clickedItemSlug === orderItem.product.slug;
  return (
    <li className="max-w-sm">
      <Link href={`/products/item/${product.slug}`}>
        <a>
          <div className="p-10 drop-shadow-2xl">
            <Image
              src={product.images[0].url}
              alt={product.name}
              layout="responsive"
              objectFit="contain"
              width={16}
              height={9}
              className="hover:scale-125 transition-transform"
            />
          </div>
        </a>
      </Link>
      <div
        className="flex flex-col items-center px-4 border border-sunny"
        style={{
          backgroundImage: `linear-gradient(
    135deg,
    transparent 0%,
    #F4E13E30 5.99%,
    transparent 39.99%,
    #F4E13E 40%,
    #F4E13E 43.99%,
    transparent 44%,
    #F4E13E30 90%,
    #F4E13E30 93.99%
  )`,
        }}
      >
        <Link href={`/products/item/${product.slug}`}>
          <a>
            <h2 className="p-4 text-xl font-anonymous text-midnight">
              {product.name}
            </h2>
          </a>
        </Link>
        <ProductQuantityWidget quantity={quantity} setQuantity={setQuantity} />
        <div className="flex items-center mb-4">
          <div className="mr-3 text-xl flex items-center font-anonymous text-midnight">
            {product.price / 100} <EuroIcon className="ml-1 mr-4" />
          </div>
          <Button
            disabled={addToCartDisabled}
            onClick={() => addItemToCart(orderItem)}
            type="button"
            bgColor="#77aaFF"
          >
            <CartIcon
              className={`${addToCartDisabled ? "animate-wiggle" : ""}`}
            />
          </Button>
        </div>
      </div>
    </li>
  );
};
