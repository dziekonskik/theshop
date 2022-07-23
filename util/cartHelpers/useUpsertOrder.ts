import { useState } from "react";
import { useUpsertOrderMutation } from "../../generated/graphql";
import { setCartIdInStorage } from "./cartUtilFunctions";
import { createOrderInput, updateOrderInput } from "./orderMutationAtoms";
import type { CartItem } from "../types";

interface useUpsertOrderProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  cartIdFromStorage: string | null;
  setCartTotal: React.Dispatch<React.SetStateAction<number>>;
}

export const useUpsertOrder = (props: useUpsertOrderProps) => {
  const [clickedItemSlug, setClickedItemSlug] = useState<string>("");
  const [upsertOrderMutation, { loading }] = useUpsertOrderMutation();

  const { cartItems, setCartItems, cartIdFromStorage, setCartTotal } = props;

  const addItemToCart = (newItem: CartItem) => {
    setClickedItemSlug(newItem.product.slug);
    upsertOrderMutation({
      variables: {
        id: {
          id: cartIdFromStorage,
        },
        data: {
          create: createOrderInput(newItem),
          update: updateOrderInput(cartItems, newItem),
        },
      },
    })
      .then(({ data }) => {
        const newCartId = data?.upsertOrder?.id;
        const newCartTotal = data?.upsertOrder?.total;

        if (!cartIdFromStorage && newCartId) {
          setCartIdInStorage(newCartId);
        }

        setClickedItemSlug("");
        if (!newCartTotal) return;
        setCartTotal(newCartTotal);

        const upsertedOrderItem = data?.upsertOrder?.orderItems.find(
          (upsertedItem) => upsertedItem?.product?.slug === newItem.product.slug
        );
        setCartItems((prevCart) => {
          const existingItem = prevCart.find(
            (cartItem) => cartItem.product.slug === newItem.product.slug
          );
          if (!existingItem) {
            return [
              ...prevCart,
              { ...newItem, id: upsertedOrderItem?.id || "" },
            ];
          }
          return prevCart.map((cartItem) => {
            if (cartItem.product.slug === newItem.product.slug) {
              return {
                ...cartItem,
                quantity: upsertedOrderItem?.quantity as number,
                id: upsertedOrderItem?.id || "",
              };
            }
            return cartItem;
          });
        });
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log("Error upserting order " + error.message);
        }
      });
  };

  return { addItemToCart, clickedItemSlug };
};
