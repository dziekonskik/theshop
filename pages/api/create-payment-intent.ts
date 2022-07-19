import { NextApiHandler } from "next";
import { Stripe } from "stripe";
import { apolloClient } from "../../graphql/apolloClient";
import {
  GetOrderTotalAndItemsByIdDocument,
  GetOrderTotalAndItemsByIdQueryVariables,
  GetOrderTotalAndItemsByIdQuery,
} from "../../generated/graphql";

const paymentIntentHandler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).setHeader("Allow", "POST").json({});
  }
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const { cartIdFromStrage } = req.body;

  if (!stripeSecret) {
    return res.status(500).json({ error: "Stripe secret not provided" });
  }

  try {
    const { data } = await apolloClient.query<
      GetOrderTotalAndItemsByIdQuery,
      GetOrderTotalAndItemsByIdQueryVariables
    >({
      query: GetOrderTotalAndItemsByIdDocument,
      variables: {
        id: cartIdFromStrage,
      },
    });
    const cartItemsRecord: Record<string, number> = {};
    data.order?.orderItems.forEach((cartEntry) => {
      if (cartEntry.product) {
        cartItemsRecord[cartEntry.product.slug] =
          cartEntry.product.price * cartEntry.quantity;
      }
    });

    const orderTotal = data.order?.total;
    if (!orderTotal) {
      return res.status(500).json({
        error: `Insufficient data to create payment intent ${JSON.stringify({
          orderTotal,
        })}`,
      });
    }

    const stripe = new Stripe(stripeSecret, { apiVersion: "2020-08-27" });
    const paymentIntent = stripe.paymentIntents.create({
      amount: orderTotal,
      currency: "EUR",
      payment_method_types: ["card", "p24"],
      metadata: {
        cartId: cartIdFromStrage,
        ...cartItemsRecord,
      },
    });
    res.status(201).json({ clientSecret: (await paymentIntent).client_secret });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error instanceof Error && error.message });
  }
};

export default paymentIntentHandler;
