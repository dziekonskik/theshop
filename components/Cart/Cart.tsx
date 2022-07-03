import Link from "next/link";
import { useCartState } from "./CartContext";
import { SvgIcon } from "../SvgIcon";

export const Cart = () => {
  const { cartState } = useCartState();
  return (
    <Link href={"/cart"}>
      <a className="flex items">
        <span className="mr-1">{cartState.length > 0 && cartState.length}</span>
        <SvgIcon strokeWidth={2} className="text-black">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </SvgIcon>
      </a>
    </Link>
  );
};
