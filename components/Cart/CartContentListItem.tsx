import Image from "next/image";
import { SvgIcon } from "../SvgIcon";
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
        <QuantityButtons cartItem={cartItem} handleOrder={handleOrder} />
      </div>
      <div className="col-span-1 md:col-span-2 backdrop-blur-md grid place-content-center -translate-y-4 ">
        <button className="cursor-pointer">
          <SvgIcon strokeWidth={2} className="h-4 w-4 md:h-6 md:w-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </SvgIcon>
        </button>
      </div>
    </li>
  );
};

const QuantityButtons = ({
  handleOrder,
  cartItem,
}: CartContentListItemProps) => {
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
            onClick={() =>
              handleOrder(cartItem)(() => addToQuantity(cartItem.quantity, 1))
            }
            className="grid place-content-center"
          >
            <span className="cursor-pointer">
              <SvgIcon strokeWidth={2} className="h-4 w-4 md:h-6 md:w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </SvgIcon>
            </span>
          </button>
          <span className="text-purple font-acme text-sm md:text-lg">
            {cartItem.quantity}
          </span>
          <button
            onClick={() =>
              handleOrder(cartItem)(() =>
                subtractFromQuantity(cartItem.quantity, 1)
              )
            }
            className="grid place-content-center"
          >
            <span className="-translate-y-px cursor-pointer">
              <SvgIcon strokeWidth={2} className="h-4 w-4 md:h-6 md:w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 13l-5 5m0 0l-5-5m5 5V6"
                />
              </SvgIcon>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
