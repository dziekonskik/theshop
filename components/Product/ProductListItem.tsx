import Link from "next/link";
import Image from "next/image";
import { useCartState } from "../Cart/CartContext";
import { AddToCartButton } from "../ButtonsAndLinks/AddToCartButton";
import { addToQuantity } from "../../util/cartHelpers";
import type { ProductDetailsFragment } from "../../generated/graphql";
import type { CartItem } from "../../util/types";

interface ProductListItemProps {
  product: ProductDetailsFragment;
}

export const ProductLstItem = ({ product }: ProductListItemProps) => {
  const { handleOrder, handledItemSlug } = useCartState();

  const orderItem: CartItem = {
    orderItemId: undefined,
    quantity: 1,
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
        <div className="flex items-center mb-4">
          <div className="mr-3 text-xl">{product.price / 100} $</div>
          <AddToCartButton
            disabled={handledItemSlug === orderItem.product.slug}
            onClick={() => handleOrder(orderItem)(addToQuantity)}
          />
        </div>
      </div>
    </>
  );
};
