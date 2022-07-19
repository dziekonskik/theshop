import { NextApiHandler } from "next";
import { Stripe } from "stripe";
import { apolloClient } from "../../graphql/apolloClient";
import {
  GetManyProductsBySlugsQuery,
  GetManyProductsBySlugsQueryVariables,
  GetManyProductsBySlugsDocument,
  ProductDetailsFragment,
} from "../../generated/graphql";

interface CartRequestType {
  slug: string;
  count: number;
}

type ProductsWithQuantities = (ProductDetailsFragment & { count: number })[];

function isTypeofProductDetail(
  productsArray: ProductsWithQuantities
): productsArray is ProductsWithQuantities {
  return (
    productsArray !== undefined &&
    productsArray.every((obj) => {
      return (
        "count" in obj &&
        typeof obj.count === "number" &&
        "price" in obj &&
        typeof obj.price === "number" &&
        "name" in obj &&
        typeof obj.name === "string" &&
        "images" in obj &&
        obj.images.length > 0 &&
        typeof obj.images[0].url === "string"
      );
    })
  );
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

  const slugsList = reqBody.map((cartItem) => cartItem.slug);
  const products = await apolloClient.query<
    GetManyProductsBySlugsQuery,
    GetManyProductsBySlugsQueryVariables
  >({
    query: GetManyProductsBySlugsDocument,
    variables: {
      slug_in: slugsList,
    },
  });

  const productsWithQuantities = products.data.products.map((product, i) => {
    return {
      ...product,
      count: product.slug === reqBody[i].slug ? reqBody[i].count : 1,
    };
  });

  if (!isTypeofProductDetail(productsWithQuantities)) {
    return res.status(422).json({ error: "Incorrect product shape" });
  }

  // Tu replikujemy nasz koszyk i tu wpływamy na to jak będzie wyglądała strona płatności
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    locale: "pl",
    payment_method_types: ["card", "p24"],
    success_url:
      "http://localhost:3000/checkout/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:3000/checkout/cancel",
    line_items: productsWithQuantities.map((product) => {
      return {
        price_data: {
          currency: "PLN",
          unit_amount: product.price,
          product_data: {
            name: product.name,
            images: product.images.map((i) => i.url),
            metadata: { slug: product.slug },
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
