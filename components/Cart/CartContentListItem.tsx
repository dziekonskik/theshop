import Image from "next/image";
import { ArrowDownIcon, ArrowUpIcon, CloseIcon } from "../Svg";
import type { CartItem } from "../../util/types";

interface CartContentListItemProps {
  cartItem: CartItem;
  deleteOrderItem: (id: string) => Promise<void>;
  increment: (id: string) => void;
  decrement: (id: string) => void;
}

export const CartContentListItem = ({
  cartItem,
  deleteOrderItem,
  increment,
  decrement,
}: CartContentListItemProps) => {
  return (
    <li
      className="mb-14 md:mb-20 bg-silver grid grid-cols-12 h-14 md:h-24 relative w-full"
      key={cartItem.product.slug}
    >
      <div className="h-20 w-20 md:h-32 md:w-32 bg-bubble-gum p-5 -translate-y-3 md:-translate-y-4 col-span-2 z-10">
        <span className="drop-shadow-md">
          <Image
            src={cartItem.product.images[0].url}
            alt={cartItem.product.name}
            layout="responsive"
            width={1}
            height={1}
          />
        </span>
      </div>
      <div className="col-span-6 grid place-content-center backdrop-blur-md -translate-y-4 pl-5 md:pl-0">
        <h3 className="pt-1 text-sm md:text-lg font-anonymous break-words text-center lg:ml-10 ml:ml-0">
          {cartItem.product.name}
        </h3>
      </div>
      <div className="col-span-3 md:col-span-2 grid place-content-center backdrop-blur-md -translate-y-4 relative">
        <span className="text-purple font-acme text-sm md:text-lg">
          $ {cartItem.product.price / 100}
        </span>
        <QuantityButtons
          cartItem={cartItem}
          increment={increment}
          decrement={decrement}
        />
      </div>
      <div className="col-span-1 md:col-span-2 backdrop-blur-md grid place-content-center -translate-y-4 ">
        <button
          className="cursor-pointer"
          onClick={() => deleteOrderItem(cartItem.id)}
        >
          <CloseIcon strokeWidth={2} className="h-4 w-4 md:h-6 md:w-6" />
        </button>
      </div>
    </li>
  );
};

const QuantityButtons = ({
  cartItem,
  increment,
  decrement,
}: Omit<CartContentListItemProps, "deleteOrderItem">) => {
  return (
    <div className="-bottom-4 absolute h-10 w-full p-2">
      <Image
        src="/assets/shapes/blurredBg.svg"
        layout="fill"
        alt="background"
        className="scale-150"
      />
      <div className="relative">
        <div className="flex items-end md:items-center justify-between">
          <button
            onClick={() => increment(cartItem.id)}
            className="grid place-content-center"
          >
            <span className="cursor-pointer">
              <ArrowUpIcon strokeWidth={2} className="h-4 w-4 md:h-6 md:w-6" />
            </span>
          </button>
          <span className="text-purple font-acme text-sm md:text-lg">
            {cartItem.quantity}
          </span>
          <button
            onClick={() => decrement(cartItem.id)}
            className="grid place-content-center"
          >
            <span className="-translate-y-px cursor-pointer">
              <ArrowDownIcon
                strokeWidth={2}
                className="h-4 w-4 md:h-6 md:w-6"
              />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
