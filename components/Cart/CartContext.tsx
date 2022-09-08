import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
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

interface CartState {
  readonly cartItems: CartItem[];
  readonly cartTotal: number;
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
  const router = useRouter();
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
    console.log(cartIdFromStorage);
    console.log(router.query.redirect_status);
    if (cartIdFromStorage && !router.query.redirect_status) {
      apolloClient
        .query<GetOrderDetailsByIdQuery, GetOrderDetailsByIdQueryVariables>({
          query: GetOrderDetailsByIdDocument,
          variables: { id: cartIdFromStorage },
          fetchPolicy: "no-cache",
        })
        .then(({ data }) => {
          if (!data.order?.orderItems) return;
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
        });
    } else {
      //this repetition is because once in a while this block loses the race condition
      resetCartState();
      window.setTimeout(() => {
        resetCartState();
      }, 100);
    }
  }, [cartIdFromStorage, router.query]);

  const resetCartState = () => {
    setCartItems([]);
    setCartTotal(0);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        clickedItemSlug,
        resetCartState,
        addItemToCart,
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
