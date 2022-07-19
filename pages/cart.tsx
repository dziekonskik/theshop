import { CartContent } from "../components/Cart/CartContent";
import { CartSummary } from "../components/Cart/CartSummary";
import { EmptyCart } from "../components/Cart/EmptyCart";
import { useCartState } from "../components/Cart/CartContext";

const CartPage = () => {
  const { cartState } = useCartState();
  return cartState.length > 0 ? (
    <div className="grid grid-cols-12 gap-8 w-full">
      <CartContent />
      <CartSummary />
    </div>
  ) : (
    <EmptyCart />
  );
};

export default CartPage;
