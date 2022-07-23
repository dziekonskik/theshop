import type { OrderCreateInput } from "../../../generated/graphql";
import type { CartItem } from "../../types";

export function createOrderInput(cartItem: CartItem): OrderCreateInput {
  return {
    email: "user@example.com",
    stripeCheckoutId: "unpaid",
    total: cartItem.quantity * cartItem.product.price,
    createdAt: new Date(),
    orderItems: {
      create: [
        {
          quantity: cartItem.quantity,
          total: cartItem.quantity * cartItem.product.price,
          product: {
            connect: {
              slug: cartItem.product.slug,
            },
          },
        },
      ],
    },
  };
}
