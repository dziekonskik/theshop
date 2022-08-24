import { apolloClient } from "../../graphql/apolloClient";
import {
  UpdateOrderDocument,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
} from "../../generated/graphql";
import type { Stripe } from "stripe";
import type { StripeWebhookEvent } from "../../stripeEvents";

export async function completeOrderWithStripeData(
  event: StripeWebhookEvent<"charge.succeeded", Stripe.Charge>
) {
  const { data } = await apolloClient.mutate<
    UpdateOrderMutation,
    UpdateOrderMutationVariables
  >({
    mutation: UpdateOrderDocument,
    variables: {
      id: {
        id: event.data.object.metadata.cartId,
      },
      data: {
        stripeCheckoutId: event.data.object.id,
        email: event.data.object.receipt_email,
      },
    },
  });
  return data?.updateOrder?.id;
}
