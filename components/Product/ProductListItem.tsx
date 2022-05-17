import Link from "next/link";
import Image from "next/image";
import { useCartState } from "../Cart/CartContext";
import { AddToCartButton } from "../AddToCartButton";
import type { ProductDetailsFragment } from "../../generated/graphql";

interface ProductListItemProps {
  data: ProductDetailsFragment;
}

export const ProductLstItem = ({ data }: ProductListItemProps) => {
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
      <Link href={`/products/item/${data.slug}`}>
        <a>
          <div className="bg-white p-10 rounded-md">
            <Image
              src={data.images[0].url}
              alt={data.name}
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
        <Link href={`/products/item/${data.slug}`}>
          <a>
            <h2 className="p-4 text-xl font-bold">{data.name}</h2>
          </a>
        </Link>
        <div className="flex items-center mb-4">
          <div className="mr-3 text-xl">{data.price / 100} $</div>
          <AddToCartButton
            disabled={handledItemSlug === orderItem.product.slug}
            onClick={() => mutateOrder(orderItem)}
          />
        </div>
      </div>
    </>
  );
};
