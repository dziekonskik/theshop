import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartState } from "../Cart/CartContext";
import { AddToCartButton } from "../ButtonsAndLinks/AddToCartButton";
import { ProductQuantityWidget } from "./ProductQuantityWidget";
import { EuroIcon } from "../Svg";
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

  return (
    <>
      <Link href={`/products/item/${product.slug}`}>
        <a>
          <div className="bg-white p-10 rounded-md">
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
      <div className="flex flex-col items-center px-4">
        <Link href={`/products/item/${product.slug}`}>
          <a>
            <h2 className="p-4 text-xl font-bold">{product.name}</h2>
          </a>
        </Link>
        <ProductQuantityWidget quantity={quantity} setQuantity={setQuantity} />
        <div className="flex items-center mb-4">
          <div className="mr-3 text-xl">
            {product.price / 100} <EuroIcon />
          </div>
          <AddToCartButton
            disabled={clickedItemSlug === orderItem.product.slug}
            onClick={() => addItemToCart(orderItem)}
          />
        </div>
      </div>
    </>
  );
};
