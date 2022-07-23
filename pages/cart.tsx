import { CartContent } from "../components/Cart/CartContent";
import { CartSummary } from "../components/Cart/CartSummary";
import { EmptyCart } from "../components/Cart/EmptyCart";
import { useCartState } from "../components/Cart/CartContext";
import { CubeTransparentIcon } from "../components/Svg";

const CartPage = () => {
  const { cartItems, transitionState } = useCartState();

  if (transitionState.type === "CartItemsLoading") {
    return (
      <div className="w-full h-96 grid place-content-center">
        <CubeTransparentIcon className="h-20 w-20 animate-spin" />
      </div>
    );
  }

  if (transitionState.type == "CartItemsOk") {
    return cartItems.length === 0 ? (
      <EmptyCart />
    ) : (
      <div className="grid grid-cols-12 gap-8 w-full">
        <CartContent />
        <CartSummary />
      </div>
    );
  }

  return <div></div>;
};

export default CartPage;
