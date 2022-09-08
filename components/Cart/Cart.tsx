import Link from "next/link";
import { useCartState } from "./CartContext";
import { CartIcon } from "../Svg/CartIcon";

interface CartProps {
  strokeWidth: number;
}

export const Cart = ({ strokeWidth }: CartProps) => {
  const { cartItems } = useCartState();
  return (
    <Link href={"/cart"}>
      <a className="flex items-center">
        <span data-testid="cart-icon" className="mr-1">
          {cartItems.length > 0 && cartItems.length}
        </span>
        <CartIcon strokeWidth={strokeWidth} className="text-midnight" />
      </a>
    </Link>
  );
};
