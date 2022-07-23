import { calculateCartTotal, findOrderItem } from "../cartUtilFunctions";
import type { OrderUpdateInput } from "../../../generated/graphql";
import type { CartItem } from "../../types";

export function updateOrderInput(
  cartItems: CartItem[],
  newItem: CartItem
): OrderUpdateInput {
  const maybeFoundOrderItem = findOrderItem(cartItems, newItem);
  return {
    email: "updated@example.com",
    stripeCheckoutId: "unpaid",
    total: calculateCartTotal(cartItems, newItem),
    orderItems: maybeFoundOrderItem
      ? {
          update: [
            {
              where: { id: maybeFoundOrderItem.id },
              data: {
                quantity: maybeFoundOrderItem.quantity + newItem.quantity,
                total:
                  (maybeFoundOrderItem.quantity + newItem.quantity) *
                  newItem.product.price,
              },
            },
          ],
        }
      : {
          create: [
            {
              quantity: newItem.quantity,
              total: newItem.quantity * newItem.product.price,
              product: {
                connect: {
                  slug: newItem.product.slug,
                },
              },
            },
          ],
        },
  };
}
