import { NextApiHandler } from "next";
import { Stripe } from "stripe";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
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

  const { data } = await apolloClient.query<
    GetOrderTotalAndItemsByIdQuery,
    GetOrderTotalAndItemsByIdQueryVariables
  >({
    query: GetOrderTotalAndItemsByIdDocument,
    variables: {
      id: cartIdFromStrage,
    },
    fetchPolicy: "network-only",
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
      error: `Insufficient data to create payment intent orderTotal: ${orderTotal}`,
    });
  }
  const session = await unstable_getServerSession(req, res, authOptions);
  console.log({ cpi: session });
  const stripe = new Stripe(stripeSecret, { apiVersion: "2020-08-27" });
  const paymentIntent = stripe.paymentIntents.create({
    amount: orderTotal,
    currency: "EUR",
    payment_method_types: ["card", "p24"],
    metadata: {
      registered_user_email: session?.user.email || null,
      cartId: cartIdFromStrage,
      ...cartItemsRecord,
    },
  });
  res.status(201).json({ clientSecret: (await paymentIntent).client_secret });
};

export default paymentIntentHandler;
