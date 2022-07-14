import { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../components/Forms/CheckoutForm";
import { getCartIdFromStorage } from "../util/cartHelpers";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const cartIdFromStrage = getCartIdFromStorage();
    fetch("api/create-payment-intent", {
      method: "POST",
      body: cartIdFromStrage,
    }).then((response) => {
      response.json().then(({ secret }) => {
        setClientSecret(secret);
      });
    });
  }, []);
  const stripeElementsConfig: StripeElementsOptions = {
    fonts: [
      {
        cssSrc:
          "https://fonts.googleapis.com/css2?family=Acme&family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap",
      },
    ],
    locale: "en",
    clientSecret,
  };
  if (!clientSecret) return null;
  return (
    <Elements stripe={stripePromise} options={stripeElementsConfig}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
