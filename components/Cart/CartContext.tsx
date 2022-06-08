import { createContext, ReactNode, useContext, useEffect } from "react";
import {
  GetWorkingOrderByIdDocument,
  GetWorkingOrderByIdQuery,
  GetWorkingOrderByIdQueryVariables,
} from "../../generated/graphql";
import { apolloClient } from "../../graphql/apolloClient";
import {
  calculateCartTotal,
  getCartIdFromStorage,
} from "../../util/cartHelpers";
import { useOrder } from "../../util/useOrder";
import type { CartItem, MutateOrder } from "../../util/types";

interface CartState {
  readonly cartState: CartItem[];
  readonly calculateCartTotal: (cartItems: CartItem[]) => number;
  readonly mutateOrder: MutateOrder;
  readonly handledItemSlug: string;
}

const CartContext = createContext<CartState | null>(null);

export const CartContextProvider = ({ children }: { children: ReactNode }) => {
  const { mutateOrder, setCartItems, cartItems, handledItemSlug } = useOrder();

  useEffect(() => {
    async function getCartItemsFromCms() {
      const idFromStroage = getCartIdFromStorage();
      if (idFromStroage) {
        const { data } = await apolloClient.query<
          GetWorkingOrderByIdQuery,
          GetWorkingOrderByIdQueryVariables
        >({
          query: GetWorkingOrderByIdDocument,
          variables: {
            id: idFromStroage,
          },
        });
        if (data && data.order) {
          setCartItems(data.order?.orderItems as CartItem[]);
        }
      }
    }
    getCartItemsFromCms();
  }, [setCartItems]);

  return (
    <CartContext.Provider
      value={{
        cartState: cartItems,
        calculateCartTotal,
        mutateOrder,
        handledItemSlug,
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
