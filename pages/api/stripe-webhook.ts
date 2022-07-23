import { NextApiHandler } from "next";
import { buffer } from "micro";
import { Stripe } from "stripe";
import { apolloClient } from "../../graphql/apolloClient";
import {
  UpdateOrderDocument,
  UpdateOrderMutation,
  UpdateOrderMutationVariables,
} from "../../generated/graphql";
import type { StripeWebhookEvents } from "../../stripeEvents";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripeWebhookHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).setHeader("Allow", "POST").end("Method Not Allowed");
  }
  const webhookSignature = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const reqAsBuffer = await buffer(req);

  if (!stripeSecret || !webhookSignature || !webhookSecret) {
    return res.status(500).json({ error: "Stripe credential not provided" });
  }
  const stripe = new Stripe(stripeSecret, { apiVersion: "2020-08-27" });

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      reqAsBuffer,
      webhookSignature,
      webhookSecret
    ) as StripeWebhookEvents;
  } catch (err: unknown) {
    return res
      .status(400)
      .send(`Webhook Error: ${err instanceof Error && err.message}`);
  }

  switch (event.type) {
    case "charge.succeeded":
      await apolloClient.mutate<
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
      // TODO: wyślij mailem w załączniku potwiuerdzenie: receipt_url w data object
      break;
  }
  res.status(204).end();
};

export default stripeWebhookHandler;
