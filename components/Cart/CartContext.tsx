import { createContext, useContext, useEffect, useState } from "react";
import { getCartIdFromStorage } from "../../util/cartHelpers/cartUtilFunctions";
import { apolloClient } from "../../graphql/apolloClient";
import {
  GetOrderDetailsByIdDocument,
  GetOrderDetailsByIdQuery,
  GetOrderDetailsByIdQueryVariables,
} from "../../generated/graphql";
import { useUpsertOrder } from "../../util/cartHelpers/useUpsertOrder";
import { useDeleteOrderItem } from "../../util/cartHelpers/useDeleteOrderItem";
import { useProcessOrder } from "../../util/cartHelpers/useProcessOrder";
import type { CartItem } from "../../util/types";
import type { TransitionState } from "../../util/cartHelpers/cartStateTypes";

interface CartState {
  readonly cartItems: CartItem[];
  readonly cartTotal: number;
  readonly transitionState: TransitionState;
  readonly clickedItemSlug: string;
  readonly resetCartState: () => void;
  readonly addItemToCart: (item: CartItem) => void;
  readonly deleteOrderItem: (id: string) => Promise<void>;
  readonly increment: (id: string) => void;
  readonly decrement: (id: string) => void;
}
interface CartContextProviderProps {
  children: React.ReactNode;
}

const CartContext = createContext<CartState | null>(null);

export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [transitionState, setTransitionState] = useState<TransitionState>({
    type: "InitialState",
  });
  const cartIdFromStorage = getCartIdFromStorage();

  const { addItemToCart, clickedItemSlug } = useUpsertOrder({
    cartIdFromStorage,
    cartItems,
    setCartItems,
    setCartTotal,
  });

  const { deleteOrderItem } = useDeleteOrderItem({
    cartIdFromStorage,
    cartTotal,
    setCartTotal,
    setCartItems,
  });

  const { increment, decrement } = useProcessOrder({
    cartIdFromStorage,
    cartItems,
    cartTotal,
    setCartItems,
    setCartTotal,
  });

  useEffect(() => {
    if (cartIdFromStorage) {
      setTransitionState({ type: "CartItemsLoading" });
      apolloClient
        .query<GetOrderDetailsByIdQuery, GetOrderDetailsByIdQueryVariables>({
          query: GetOrderDetailsByIdDocument,
          variables: { id: cartIdFromStorage },
        })
        .then(({ data }) => {
          if (data.order?.stripeCheckoutId !== "unpaid") return;
          if (!data.order?.orderItems) {
            setTransitionState({
              type: "CartLoadingError",
              message: "Please refresh the page",
            });
            return;
          }
          const orderItemsWithProduct = data.order.orderItems.filter(
            (orderItem): orderItem is CartItem =>
              typeof orderItem.product !== undefined
          );
          const dataToState: CartItem[] = orderItemsWithProduct.map(
            (orderItem) => {
              return {
                id: orderItem.id,
                quantity: orderItem.quantity,
                product: {
                  slug: orderItem.product?.slug,
                  name: orderItem.product?.name,
                  images: orderItem.product?.images,
                  price: orderItem.product?.price,
                },
              };
            }
          );
          setCartItems(dataToState);
          setCartTotal(data.order.total);
          setTransitionState({ type: "CartItemsOk" });
        });
    }
  }, [cartIdFromStorage]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        clickedItemSlug,
        resetCartState: () => setCartItems([]),
        addItemToCart,
        transitionState,
        cartTotal,
        deleteOrderItem,
        increment,
        decrement,
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
