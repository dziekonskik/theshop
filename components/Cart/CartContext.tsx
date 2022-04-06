import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

interface CartItem {
  readonly id: string;
  readonly title: string;
  readonly price: number;
  readonly count: number;
}

interface CartState {
  readonly items: CartItem[];
  readonly addItemToCart: (item: CartItem) => void;
  readonly removeItemsFromCart: (id: CartItem["id"]) => void;
}

const CartContext = createContext<CartState | null>(null);

const getCartItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem("ZAISTE_SHOPPING_CART");
  if (!itemsFromLocalStorage) return [];
  try {
    const items = JSON.parse(itemsFromLocalStorage);
    return items;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const setCartItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("ZAISTE_SHOPPING_CART", JSON.stringify(cartItems));
};

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
        addItemToCart: (item) =>
          setCartItems((prevState) => {
            const existingItem = prevState.find(
              (existingItem) => existingItem.id === item.id
            );
            if (!existingItem) {
              return [...prevState, item];
            }
            return prevState.map((existingItem) => {
              if (existingItem.id === item.id) {
                return {
                  ...existingItem,
                  count: existingItem.count + 1,
                };
              }
              return existingItem;
            });
          }),
        removeItemsFromCart: (id) =>
          setCartItems((prevState) => {
            const existingItem = prevState.find((el) => el.id === id);
            if (existingItem && existingItem.count <= 1) {
              return prevState.filter((el) => el.id !== id);
            }
            return prevState.map((el) => {
              if (el.id === id) {
                return {
                  ...el,
                  count: el.count - 1,
                };
              }
              return el;
            });
          }),
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
