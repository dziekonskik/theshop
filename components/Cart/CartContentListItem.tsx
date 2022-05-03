import Image from "next/image";
import { useCartState } from "./CartContext";
import type { ProductDetailsFragment } from "../../generated/graphql";

interface CartContentListItemProps {
  cartItem: Omit<ProductDetailsFragment, "description"> & { count: number };
}

export const CartContentListItem = ({ cartItem }: CartContentListItemProps) => {
  const { addItemToCart, removeItemsFromCart } = useCartState();
  return (
    <li className="flex items-center h-32 w-full" key={cartItem.id}>
      <div className="h-full w-32 drop-shadow-md p-7">
        <Image
          src={cartItem.images[0].url}
          alt={cartItem.name}
          layout="responsive"
          width={5}
          height={5}
        />
      </div>
      <div className="ml-8 flex items-center font-play">
        <h3 className="pt-1">{cartItem.name}</h3>
        <p className="ml-2 translate-y-px">
          {cartItem.price / 100} <span className="text-gray-500">x</span>{" "}
          <span className="font-semibold text-xl">{cartItem.count}</span>
        </p>
        <div className="ml-4 p-2">
          <button
            onClick={() => addItemToCart(cartItem)}
            className="rounded-full h-5 w-5 bg-sky-700 text-white grid place-content-center mb-1"
          >
            <span className="-translate-y-px">+</span>
          </button>
          <button
            onClick={() => removeItemsFromCart(cartItem.id)}
            className="rounded-full h-5 w-5 bg-sky-700 text-white grid place-content-center"
          >
            <span className="-translate-y-px">-</span>
          </button>
        </div>
      </div>
    </li>
  );
};
