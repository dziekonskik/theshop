import { NextApiHandler } from "next";
import { apolloClient } from "../../graphql/apolloClient";
import {
  UpdateOrderDocument,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
} from "../../generated/graphql";
import type { StripeWebhookEvents } from "../../stripeEvents";

const stripeWebhookHandler: NextApiHandler = (req, res) => {
  const event = req.body as StripeWebhookEvents;

  switch (event.type) {
    case "checkout.session.completed":
      // TODO: zaktualizuj zamówienie w graphcms
      break;
    case "charge.succeeded":
      apolloClient.mutate<UpdateOrderMutation, UpdateOrderMutationVariables>({
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
      // TODO: wyślij mailem w załączniku potwiuerdzenie: receipt_url w data object
      break;
  }
  res.status(204).end();
};

export default stripeWebhookHandler;
