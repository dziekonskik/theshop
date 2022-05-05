import type { CartItem } from "./types";

type StateSetter = React.Dispatch<React.SetStateAction<CartItem[]>>;

export const addItemToCart = (item: CartItem) => (setState: StateSetter) => {
  setState((prevState) => {
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
  });
};

export const removeItemsFromCart = (id: string) => (setState: StateSetter) => {
  setState((prevState) => {
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
  });
};

export function calculateCartTotal(cartItems: CartItem[]) {
  const pricesTotal = cartItems.map((item) => item.count * item.price);
  return pricesTotal.reduce((current, total) => current + total, 0);
}

export const getCartItemsFromStorage = () => {
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

export const setCartItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("ZAISTE_SHOPPING_CART", JSON.stringify(cartItems));
};
