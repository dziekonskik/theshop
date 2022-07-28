import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDownIcon, ArrowUpIcon, CloseIcon, EuroIcon } from "../Svg";
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
    <motion.li
      exit={{ translateX: "50%", opacity: 0, scale: 0 }}
      transition={{ duration: 0.3 }}
      layout
      className="mb-20 md:mb-24 bg-silver grid grid-cols-12 h-20 md:h-24 relative w-full"
      key={cartItem.product.slug}
    >
      <div className="h-24 w-24 md:h-32 md:w-32 bg-bubble-gum p-5 -translate-y-2 md:-translate-y-4 col-span-2 z-10">
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
      <div className="col-span-6 grid place-content-center -translate-y-4 pl-7 md:pl-0">
        <h3 className="pt-1 text-sm md:text-lg font-anonymous break-words text-center lg:ml-10 ml:ml-0 translate-y-2 md:translate-y-0">
          {cartItem.product.name}
        </h3>
      </div>
      <div className="col-span-3 md:col-span-2 grid place-content-center -translate-y-4 relative">
        <span className="text-purple font-comfortaa text-sm md:text-lg flex items-center translate-y-2 md:translate-y-0 -translate-x-4 lg:-translate-x-0">
          <EuroIcon className="mr-1 md:mr-2 h-3 md:h-5 w-3 md:w-5 -translate-y-px" />{" "}
          {cartItem.product.price / 100}
        </span>
        <QuantityButtons
          cartItem={cartItem}
          increment={increment}
          decrement={decrement}
        />
      </div>
      <div className="col-span-1 md:col-span-2 flex justify-end items-center mr-4">
        <button
          className="cursor-pointer border p-2 -translate-y-2 md:-translate-y-4"
          onClick={() => deleteOrderItem(cartItem.id)}
        >
          <CloseIcon strokeWidth={2} className="h-5 w-5" />
        </button>
      </div>
    </motion.li>
  );
};

const QuantityButtons = ({
  cartItem,
  increment,
  decrement,
}: Omit<CartContentListItemProps, "deleteOrderItem">) => {
  return (
    <div className="-bottom-8 md:-bottom-4 absolute h-12 w-28 md:w-32 z-50">
      <div className="relative">
        <div className="flex items-end md:items-center justify-between">
          <button
            onClick={() => increment(cartItem.id)}
            className="grid place-content-center p-2 border translate-y-4 bg-silver"
          >
            <span className="cursor-pointer">
              <ArrowUpIcon strokeWidth={2} className="h-5 w-5" />
            </span>
          </button>
          <span className="text-purple font-comfortaa md:text-lg translate-y-2.5 md:translate-y-4">
            {cartItem.quantity}
          </span>
          <button
            onClick={() => decrement(cartItem.id)}
            className="grid place-content-center border p-2 translate-y-4 bg-silver"
          >
            <span className="-translate-y-px cursor-pointer">
              <ArrowDownIcon strokeWidth={2} className="h-5 w-5" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
