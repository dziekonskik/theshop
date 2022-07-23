import { BigLink } from "../ButtonsAndLinks/BigLink";
import { CartContentListItem } from "./CartContentListItem";
import { useCartState } from "./CartContext";
import type { CartItem } from "../../util/types";

export const CartContent = () => {
  const { cartItems, cartTotal, deleteOrderItem, increment, decrement } =
    useCartState();

  return (
    <div className="col-span-12 lg:col-span-6 w-full">
      <div className="h-full lg:max-h-[550px] overflow-y-auto scrollbar w-full py-4">
        <div className="flex flex-col">
          <ul className="w-full">
            {cartItems.map((cartItem) => {
              return (
                <CartContentListItem
                  cartItem={cartItem}
                  deleteOrderItem={deleteOrderItem}
                  increment={increment}
                  decrement={decrement}
                  key={cartItem.product.slug}
                />
              );
            })}
          </ul>
        </div>
      </div>
      <SummaryBottomWidget cartItems={cartItems} cartTotal={cartTotal} />
    </div>
  );
};

interface SummaryBottomWidgetProps {
  cartItems: CartItem[];
  cartTotal: number;
}

const SummaryBottomWidget = ({
  cartItems,
  cartTotal,
}: SummaryBottomWidgetProps) => (
  <section className="bg-sunny bg-opacity-90 lg:hidden sticky bottom-0 z-10 flex p-4">
    <div className="container mx-auto flex justify-between">
      <summary className="flex flex-col w-1/2 md:w-1/3">
        <div className="flex justify-between mt-4 font-acme text-xl">
          <span className="capitalize">Items:</span>
          <span>{cartItems.length}</span>
        </div>
        <div className="flex justify-between mt-4 font-acme text-xl">
          <span className="capitalize">Discount:</span>
          <span>$ 0</span>
        </div>
        <div className="flex justify-between mt-4 font-acme text-xl">
          <span className="uppercase mr-3">Total:</span>
          <span>$ {cartTotal / 100}</span>
        </div>
      </summary>
      <article className="flex justify-center items-center w-1/2 md:w-1/3">
        <BigLink bgColor="#6C63FF" href="/checkout">
          checkout
        </BigLink>
      </article>
    </div>
  </section>
);
