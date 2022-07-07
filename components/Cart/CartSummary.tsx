import { BigLink } from "../BigLink";
import { useCartState } from "./CartContext";

export const CartSummary = () => {
  const { calculateCartTotal, cartState } = useCartState();
  const cartTotal = calculateCartTotal(cartState);
  return (
    <section className="hidden col-span-6 lg:flex justify-end relative">
      <div className="mr-16 h-1/2 w-full bg-bermuda -skew-y-12 -z-10 border-4 border-midnight translate-y-5 flex justify-end relative">
        <div className="h-full skew-y-12 w-44 bg-sunny bg-opacity-90 absolute -right-16 top-10 scale-y-110"></div>
        <article className="skew-y-12 mt-12 flex flex-col absolute right-11 w-44">
          <h2 className="font-acme z-50 text-2xl capitalize">Summary:</h2>
          <div className="flex justify-between mt-8 font-acme z-50">
            <span className="capitalize">Items:</span>
            <span>{cartState.length}</span>
          </div>
          <div className="flex justify-between mt-8 font-acme z-50">
            <span className="capitalize">Discount:</span>
            <span>$ 0</span>
          </div>
          <div className="flex justify-between mt-8 font-acme z-50">
            <span className="uppercase">Total:</span>
            <span>$ {cartTotal / 100}</span>
          </div>
        </article>
      </div>
      <div className="absolute bottom-[40%] right-32 ">
        <BigLink bgColor="#6C63FF" href="/checkout">
          checkout
        </BigLink>
      </div>
    </section>
  );
};
