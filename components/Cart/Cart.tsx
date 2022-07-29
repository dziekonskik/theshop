import Link from "next/link";
import { useCartState } from "./CartContext";
import { CartIcon } from "../Svg/CartIcon";

export const Cart = () => {
  const { cartItems } = useCartState();
  return (
    <Link href={"/cart"}>
      <a className="flex items-center">
        <span className="mr-1">{cartItems.length > 0 && cartItems.length}</span>
        <CartIcon strokeWidth={2} className="text-midnight" />
      </a>
    </Link>
  );
};
