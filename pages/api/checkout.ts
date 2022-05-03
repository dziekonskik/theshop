import { NextApiHandler } from "next";
import { Stripe } from "stripe";
import { apolloClient } from "../../graphql/apolloClient";
import {
  GetProductBySlugDocument,
  GetProductBySlugQueryVariables,
  GetProductBySlugQuery,
} from "../../generated/graphql";

interface CartRequestType {
  slug: string;
  count: number;
}

function isCartRequestType(reqBody: any[]): reqBody is CartRequestType[] {
  return reqBody.every(
    (cartItem) =>
      "slug" in cartItem &&
      typeof cartItem.slug === "string" &&
      "count" in cartItem &&
      typeof cartItem.count === "number"
  );
}

const checkoutHandler: NextApiHandler = async (req, res) => {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;

  if (req.method !== "POST") {
    // Status Code: 405 Method Not Allowed
    return res.status(405).setHeader("Allow", "POST").json({});
  }

  if (!stripeSecret) {
    return res.status(500).json({ error: "Stripe secret not provided" });
  }

  const stripe = new Stripe(stripeSecret, { apiVersion: "2020-08-27" });

  const reqBody = JSON.parse(req.body);

  if (!isCartRequestType(reqBody)) {
    return res.status(422).json({ error: "Incorrect request body shape" });
  }

  const products = await Promise.all(
    reqBody.map(async (cartItem) => {
      const product = await apolloClient.query<
        GetProductBySlugQuery,
        GetProductBySlugQueryVariables
      >({
        query: GetProductBySlugDocument,
        variables: {
          slug: cartItem.slug,
        },
      });

      return {
        product,
        count: cartItem.count,
      };
    })
  );

  // Tu replikujemy nasz koszyk i tu wpływamy na to jak będzie wyglądała strona płatności
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "pl",
    payment_method_types: ["card", "p24"],
    success_url:
      "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/checkout/cancel",
    line_items: products.map((product) => {
      return {
        price_data: {
          currency: "PLN",
          unit_amount: product.product.data.product!.price,
          product_data: {
            name: product.product.data.product!.name,
            images: product.product.data.product!.images.map((i) => i.url),
            metadata: { slug: product.product.data.product!.slug },
          },
        },
        quantity: product.count,
      };
    }),
  });

  // TODO: stworzyć i obsłuyć order w graphcms

  res.status(201).json({ session: checkoutSession });
};

export default checkoutHandler;
