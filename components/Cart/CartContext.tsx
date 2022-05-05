import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import {
  calculateCartTotal,
  getCartItemsFromStorage,
  setCartItemsInStorage,
  addItemToCart,
  removeItemsFromCart,
} from "../../util/cartHelpers";
import type { CartItem } from "../../util/types";

interface CartState {
  readonly items: CartItem[];
  readonly addItemToCart: (item: CartItem) => void;
  readonly removeItemsFromCart: (id: CartItem["id"]) => void;
  readonly calculateCartTotal: (cartItems: CartItem[]) => number;
}

const CartContext = createContext<CartState | null>(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCartItemsFromStorage());
  }, []);
  useEffect(() => {
    setCartItemsInStorage(cartItems);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        items: cartItems,
        addItemToCart: (item) => addItemToCart(item)(setCartItems),
        removeItemsFromCart: (id) => removeItemsFromCart(id)(setCartItems),
        calculateCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartContext);

  if (!cartState) {
    throw new Error("You forgot CartContextProvider");
  }

  return cartState;
};
