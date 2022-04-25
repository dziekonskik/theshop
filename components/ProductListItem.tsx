import Link from "next/link";
import Image from "next/image";
import { useCartState } from "./Cart/CartContext";
import type { ProductDetails } from "./ProductDetails";

type ProductListItem = Pick<
  ProductDetails,
  "name" | "thumbnailUrl" | "thumbnailAlt" | "id" | "slug"
>;
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
              thumbnailUrl: data.thumbnailUrl,
              thumbnailAlt: data.thumbnailAlt,
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
