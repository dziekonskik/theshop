import { NextApiHandler } from "next";
import { Stripe } from "stripe";

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

  const lineItems = JSON.parse(req.body);

  // Tu replikujemy nasz koszyk i tu wpływamy na to jak będzie wyglądała strona płatności
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "pl",
    payment_method_types: ["card", "p24"],
    success_url:
      "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/checkout/cancel",
    line_items: lineItems,
  });

  res.status(201).json({ session: checkoutSession });
};

export default checkoutHandler;
