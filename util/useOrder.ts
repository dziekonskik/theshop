import { useState } from "react";
import {
  useDeleteOrderMutation,
  useUpsertOrderMutation,
} from "../generated/graphql";
import {
  calculateCartTotal,
  calculateTotalCartItemsQuantity,
  findCartItemIdBySlug,
  getCartIdFromStorage,
  removeCartFromStorage,
  setCartIdInStorage,
  findCartItemIdToDelete,
} from "./cartHelpers";
import type { CartItem, CalculatorFn } from "./types";

export const useOrder = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [handledItemSlug, setHandledItemSlug] = useState("");
  const [deleteOrderMutation, deletedOrderMutation] = useDeleteOrderMutation();
  const [upsertOrderMutation, upsertedOrderMutation] = useUpsertOrderMutation();

  const deleteOrderById = async (id: string) => {
    await deleteOrderMutation({ variables: { id: { id } } });
  };
  const handleOrder =
    (currentItem: CartItem) => async (calculator: CalculatorFn) => {
      await setHandledItemSlug(currentItem.product.slug);
      if (!handledItemSlug) {
        const { data } = await upsertOrderMutation({
          variables: {
            id: {
              id: getCartIdFromStorage(),
            },
            data: {
              create: {
                email: "created@example.com",
                stripeCheckoutId: "unpaid",
                total: currentItem.quantity,
                orderItems: {
                  create: [
                    {
                      quantity: currentItem.quantity,
                      total: currentItem.quantity,
                      product: {
                        connect: {
                          slug: currentItem.product.slug,
                        },
                      },
                    },
                  ],
                },
              },
              update: {
                email: "updated@example.com",
                stripeCheckoutId: "unpaid",
                total: calculateCartTotal(cartItems),
                orderItems: {
                  upsert: cartItems.map((cartItem) => {
                    return {
                      where: {
                        id: findCartItemIdBySlug(
                          currentItem.product.slug,
                          cartItems
                        ),
                      },
                      data: {
                        create: {
                          quantity: currentItem.quantity,
                          total: calculateTotalCartItemsQuantity(
                            cartItems,
                            currentItem.quantity
                          )(calculator),
                          product: {
                            connect: {
                              slug: currentItem.product.slug,
                            },
                          },
                        },
                        update: {
                          quantity: calculator(
                            cartItem.quantity,
                            currentItem.quantity
                          ),
                          total: calculateTotalCartItemsQuantity(
                            cartItems,
                            currentItem.quantity
                          )(calculator),
                        },
                      },
                    };
                  }),
                  delete: findCartItemIdToDelete(cartItems),
                },
              },
            },
          },
        });
        if (!data?.upsertOrder?.orderItems.length && getCartIdFromStorage()) {
          deleteOrderById(getCartIdFromStorage());
          removeCartFromStorage();
        }
        if (data && data.upsertOrder) {
          setCartIdInStorage(data.upsertOrder.id);
          setCartItems(data?.upsertOrder?.orderItems as CartItem[]);
          setHandledItemSlug("");
        }
      }
    };
  // state i setter tu w hooku czy lepiej w contexcie?
  return { handleOrder, cartItems, setCartItems, handledItemSlug };
};
