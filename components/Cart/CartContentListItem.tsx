import Image from "next/image";
import { addToQuantity, subtractFromQuantity } from "../../util/cartHelpers";
import type { CartItem, MutateOrder } from "../../util/types";

interface CartContentListItemProps {
  cartItem: CartItem;
  handleOrder: MutateOrder;
}

export const CartContentListItem = ({
  cartItem,
  handleOrder,
}: CartContentListItemProps) => {
  return (
    <li className="flex items-center h-32 w-full" key={cartItem.product.slug}>
      <div className="h-full w-32 drop-shadow-md p-7">
        <Image
          src={cartItem.product.images[0].url}
          alt={cartItem.product.name}
          layout="responsive"
          width={5}
          height={5}
        />
      </div>
      <div className="ml-8 flex items-center font-play">
        <h3 className="pt-1">{cartItem.product.name}</h3>
        <p className="ml-2 translate-y-px">
          {cartItem.product.price / 100}{" "}
          <span className="text-gray-500">x</span>{" "}
          <span className="font-semibold text-xl">{cartItem.quantity}</span>
        </p>
        <div className="ml-4 p-2">
          <button
            onClick={() =>
              handleOrder(cartItem)(() => addToQuantity(cartItem.quantity, 1))
            }
            className="rounded-full h-5 w-5 bg-sky-700 text-white grid place-content-center mb-1"
          >
            <span className="-translate-y-px">+</span>
          </button>
          <button
            onClick={() =>
              handleOrder(cartItem)(() =>
                subtractFromQuantity(cartItem.quantity, 1)
              )
            }
            className="rounded-full h-5 w-5 bg-sky-700 text-white grid place-content-center"
          >
            <span className="-translate-y-px">-</span>
          </button>
        </div>
      </div>
    </li>
  );
};
