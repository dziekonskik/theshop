import Link from "next/link";
import { useCartState } from "./CartContext";

export const Cart = () => {
  const { cartState } = useCartState();
  return (
    <Link href={"/cart"}>
      <a className="flex items">
        <span className="mr-1">{cartState.length > 0 && cartState.length}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-slate-900"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      </a>
    </Link>
  );
};
