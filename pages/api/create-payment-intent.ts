import { NextApiHandler } from "next";
import { Stripe } from "stripe";
import { apolloClient } from "../../graphql/apolloClient";
import {
  GetOrderTotalByIdQueryVariables,
  GetOrderTotalByIdDocument,
  GetOrderTotalByIdQuery,
} from "../../generated/graphql";

const paymentIntentHandler: NextApiHandler = async (req, res) => {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const orderId = req.body;

  if (!stripeSecret) {
    return res.status(500).json({ error: "Stripe secret not provided" });
  }

  // tu jest problem
  const { data } = await apolloClient.query<
    GetOrderTotalByIdQuery,
    GetOrderTotalByIdQueryVariables
  >({
    query: GetOrderTotalByIdDocument,
    variables: {
      id: orderId.toString(),
    },
  });

  console.log({ total: data.order?.total, orderId });

  if (!data.order?.total) {
    return res.status(500).json({ error: "No order total" });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: "2020-08-27" });
  const paymentIntent = stripe.paymentIntents.create({
    amount: data.order.total,
    currency: "USD",
  });
  res.status(201).json({ paymentIntent });
};

export default paymentIntentHandler;
