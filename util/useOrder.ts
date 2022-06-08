import { useState } from "react";
import {
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
  ProductDetailsFragment,
} from "../generated/graphql";
import {
  calculateCartTotal,
  calculateTotalCartItemsQuantity,
  findCartItemBySlug,
  getCartIdFromStorage,
  removeCartFromStorage,
  setCartIdInStorage,
  findCartItemIdToDelete,
} from "./cartHelpers";
import type { CartItem, CalculatorFn } from "./types";

function isProduct(
  object: ProductDetailsFragment | undefined
): object is ProductDetailsFragment {
  return (
    object !== undefined &&
    "description" in object &&
    typeof object.description === "string" &&
    "id" in object &&
    typeof object.id === "string" &&
    "name" in object &&
    typeof object.name === "string" &&
    "price" in object &&
    typeof object.price === "number" &&
    "slug" in object &&
    typeof object.slug === "string" &&
    "images" in object &&
    typeof object.images[0] === "string"
  );
}

function isCartItemArray(data: CartItem[] | undefined): data is CartItem[] {
  return (
    data !== undefined &&
    data.every((cartItem) => {
      "id" in cartItem &&
        typeof cartItem.id === "string" &&
        "quantity" in cartItem &&
        typeof cartItem.quantity === "number" &&
        isProduct(cartItem.product);
    })
  );
}

export const useOrder = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [handledItemSlug, setHandledItemSlug] = useState("");
  const [createOrderMutation, createdOrderMutation] = useCreateOrderMutation();
  const [updateOrderMutation, updatedOrderMutation] = useUpdateOrderMutation();
  const [deleteOrderMutation, deletedOrderMutation] = useDeleteOrderMutation();

  const createOrder = async (currentItem: CartItem) => {
    await setHandledItemSlug(currentItem.product.slug); // to ma zapobiec dodawaniu się więcej niz jednego orderu bo jak za szybko naciskam to się dodaje x orderów zamiast 1 i update, uzywam tego tez do zablokowania odpowiedniego buttona, resetuje to po wróceniu danych
    if (!handledItemSlug) {
      const { data } = await createOrderMutation({
        variables: {
          order: {
            email: "test@example.com",
            stripeCheckoutId: "unpaid",
            total: currentItem.product.price * currentItem.quantity,
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
        },
      });
      if (data && data.createOrder) {
        setCartIdInStorage(data.createOrder.id);
        setCartItems(data.createOrder.orderItems as CartItem[]);
        setHandledItemSlug("");
      }
    }
  };

  const deleteOrderById = async (id: string) => {
    await deleteOrderMutation({ variables: { id: { id } } });
  };

  const updateOrder =
    (currentItem: CartItem) => async (calculator: CalculatorFn) => {
      await setHandledItemSlug(currentItem.product.slug);
      if (!handledItemSlug) {
        const { data } = await updateOrderMutation({
          variables: {
            id: {
              id: getCartIdFromStorage(),
            },
            data: {
              email: "updated@example.com",
              stripeCheckoutId: "unpaid",
              total: calculateCartTotal(cartItems),
              orderItems: {
                upsert: cartItems.map((cartItem) => {
                  return {
                    where: {
                      id: findCartItemBySlug(
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
        });
        if (!data?.updateOrder?.orderItems.length && getCartIdFromStorage()) {
          deleteOrderById(getCartIdFromStorage());
          removeCartFromStorage();
        }
        // czy tu zeby się pozbyć tych nulli i undefinedów z data to musiał bym uzyć biblioteki typu zod?
        // if (isCartItemArray(data?.updateOrder?.orderItems)) {
        // } co pojebałem w isCartItemArray na górze ze ciagle jest Type 'undefined' is not assignable to type 'ProductDetailsFragment'.ts(2345) :)
        setCartItems(data?.updateOrder?.orderItems as CartItem[]);
        setHandledItemSlug("");
      }
    };

  const mutateOrder = (currentItem: CartItem) => (calculator: CalculatorFn) => {
    if (!getCartIdFromStorage()) {
      createOrder(currentItem);
    } else {
      updateOrder(currentItem)(calculator);
    }
  };
  // state i setter tu w hooku czy lepiej w contexcie?
  return { mutateOrder, cartItems, setCartItems, handledItemSlug };
};
