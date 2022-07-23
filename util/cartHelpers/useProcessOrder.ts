import { useProcessOrderMutation } from "../../generated/graphql";
import type { CartItem } from "../types";

interface UseUpdateOrderProps {
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
  setCartTotal: React.Dispatch<React.SetStateAction<number>>;
  cartIdFromStorage: string | null;
  cartTotal: number;
  cartItems: CartItem[];
}

function calculus(
  biggerValue: number,
  smallerValue: number,
  direction: "up" | "down"
) {
  return direction === "up"
    ? biggerValue + smallerValue
    : biggerValue - smallerValue;
}

export const useProcessOrder = (props: UseUpdateOrderProps) => {
  const [processOrderByItemId, processOrderByItemIdStatus] =
    useProcessOrderMutation();
  const {
    cartIdFromStorage,
    cartItems,
    cartTotal,
    setCartItems,
    setCartTotal,
  } = props;

  const changeQuantity = (direction: "up" | "down") => (id: string) => {
    const foundItem = cartItems.find((cartItem) => cartItem.id === id);

    if (!foundItem) return;
    if (direction === "down" && foundItem.quantity === 1) return;

    const priceOfItem = foundItem.product.price;
    const newItemQuantity = calculus(foundItem.quantity, 1, direction);
    const newItemTotal = calculus(
      foundItem.quantity * priceOfItem,
      priceOfItem,
      direction
    );
    const newOrderTotal = calculus(cartTotal, priceOfItem, direction);

    processOrderByItemId({
      variables: {
        id: { id: cartIdFromStorage },
        data: {
          total: newOrderTotal,
          orderItems: {
            update: [
              {
                where: { id },
                data: {
                  quantity: newItemQuantity,
                  total: newItemTotal,
                },
              },
            ],
          },
        },
      },
    })
      .then(({ data }) => {
        const newCartTotal = data?.updateOrder?.total || 0;
        const processedItem = data?.updateOrder?.orderItems.find(
          (processedItem) => processedItem.id === id
        );

        if (!processedItem) return;
        setCartItems((prevCart) =>
          prevCart.map((cartItem) => {
            if (cartItem.id === foundItem.id) {
              return {
                ...cartItem,
                quantity: processedItem.quantity,
              };
            }
            return cartItem;
          })
        );
        setCartTotal(newCartTotal);
      })
      .catch((error) => {
        if (error instanceof Error) {
          console.log("Error processing order " + error.message);
        }
      });
  };

  const increment = changeQuantity("up");
  const decrement = changeQuantity("down");

  return { increment, decrement };
};
