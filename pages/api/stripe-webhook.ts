import { NextApiHandler } from "next";
import type { StripeWebhookEvents } from "../../stripeEvents";

const stripeWebhookHandler: NextApiHandler = (req, res) => {
  const event = req.body as StripeWebhookEvents;

  switch (event.type) {
    case "checkout.session.completed":
      // TODO: zaktualizuj zamówienie w graphcms
      return;
  }
  res.status(204).end();
};

export default stripeWebhookHandler;
