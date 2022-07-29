import { BigLink } from "../ButtonsAndLinks/BigLink";
import { useCartState } from "./CartContext";
import { EuroIcon } from "../Svg";

export const CartSummary = () => {
  const { cartTotal, cartItems } = useCartState();

  return (
    <section className="hidden lg:flex flex-col items-end w-1/2 placeholder-opacity-75 over pr-16 text-midnight">
      <div className="mt-[74px] h-1/2 w-full bg-bermuda -skew-y-12 -z-10 border-4 border-midnight translate-y-5 flex justify-end relative">
        <div className="h-full skew-y-12 w-44 bg-lightblue bg-opacity-70 absolute -right-16 top-10 scale-y-110"></div>
        <summary className="skew-y-12 mt-12 flex flex-col absolute right-11 w-44">
          <h2 className="font-comfortaa z-50 text-2xl capitalize -translate-x-11">
            Summary:
          </h2>
          <div className="flex justify-between mt-8 font-comfortaa z-50">
            <span className="capitalize">Items:</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="flex justify-between mt-8 font-comfortaa z-50">
            <span className="capitalize">Discount:</span>
            <span className="flex items-center">
              <EuroIcon className="mr-1 h-4 w-4" /> 0
            </span>
          </div>
          <div className="flex justify-between mt-8 font-comfortaa z-50">
            <span className="uppercase">Total:</span>
            <span className="flex items-center">
              <EuroIcon className="mr-1 h-4 w-4" /> {cartTotal / 100}
            </span>
          </div>
        </summary>
      </div>
      <div className="mt-7">
        <BigLink bgColor="#6C63FF" href="/checkout">
          checkout
        </BigLink>
      </div>
    </section>
  );
};
