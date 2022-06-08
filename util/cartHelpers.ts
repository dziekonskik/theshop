import type { CartItem, CalculatorFn } from "./types";

export function calculateCartTotal(cartItems: CartItem[]) {
  const pricesTotal = cartItems.map(
    (item) => item.quantity * item.product.price
  );
  return pricesTotal.reduce((current, total) => current + total, 0);
}

export const getCartIdFromStorage = () => {
  const cartIdFromLocalStorage = localStorage.getItem("ZAISTE_SHOPPING_CART");
  return cartIdFromLocalStorage ? cartIdFromLocalStorage : "";
};

export const removeCartFromStorage = () => {
  return localStorage.removeItem("ZAISTE_SHOPPING_CART");
};

export const setCartIdInStorage = (cartId: string) => {
  localStorage.setItem("ZAISTE_SHOPPING_CART", cartId);
};

export const findCartItemBySlug = (slug: string, cartItems: CartItem[]) => {
  const cartItem = cartItems.find((item) => item.product.slug === slug);
  console.log({
    foundCartItemSlug: cartItem?.product.slug,
    foundCartItemId: cartItem?.id,
  });
  return cartItem ? cartItem.id : "";
};

export const findCartItemIdToDelete = (cartItems: CartItem[]) => {
  const cartItemToDelete = cartItems.find((cartItem) => cartItem.quantity < 1);
  return cartItemToDelete ? [{ id: cartItemToDelete.id }] : undefined;
};

export const addToQuantity: CalculatorFn = (
  cartItemQuantity,
  currentItemQuantity
) => {
  return cartItemQuantity + currentItemQuantity;
};

export const subtractFromQuantity: CalculatorFn = (
  cartItemQuantity,
  currentItemQuantity
) => {
  return cartItemQuantity - currentItemQuantity;
};

export const calculateTotalCartItemsQuantity =
  (cartItems: CartItem[], currentItemQuantity: number) =>
  (calculatorFn: CalculatorFn) => {
    const total = cartItems.reduce((current, total) => {
      return total.quantity + current;
    }, 0);
    return calculatorFn(total, currentItemQuantity);
  };
