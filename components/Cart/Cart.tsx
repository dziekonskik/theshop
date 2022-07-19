import Link from "next/link";
import { useCartState } from "./CartContext";
import { CartIcon } from "../Svg/CartIcon";

export const Cart = () => {
  const { cartState } = useCartState();
  return (
    <Link href={"/cart"}>
      <a className="flex items">
        <span className="mr-1">{cartState.length > 0 && cartState.length}</span>
        <CartIcon strokeWidth={2} className="text-black" />
      </a>
    </Link>
  );
};
