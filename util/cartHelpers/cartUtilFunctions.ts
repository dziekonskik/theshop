import type { CartItem } from "../types";

export function calculateCartTotal(cartItems: CartItem[], newItem: CartItem) {
  const newItemTotalPrice = newItem.quantity * newItem.product.price;
  return (
    cartItems.reduce(
      (total, current) => total + current.quantity * current.product.price,
      0
    ) + newItemTotalPrice
  );
}

export const getCartIdFromStorage = () => {
  try {
    const cartIdFromLocalStorage = localStorage.getItem("ZAISTE_SHOPPING_CART");
    return cartIdFromLocalStorage ? cartIdFromLocalStorage : "";
  } catch (error) {
    return null;
  }
};

export const removeCartFromStorage = () => {
  localStorage.removeItem("ZAISTE_SHOPPING_CART");
};

export const setCartIdInStorage = (cartId: string) => {
  localStorage.setItem("ZAISTE_SHOPPING_CART", cartId);
};

export const findOrderItem = (cartItems: CartItem[], newItem: CartItem) =>
  cartItems.find((item) => item.product.slug === newItem.product.slug);
