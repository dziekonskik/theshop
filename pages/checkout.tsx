import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../components/Forms/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!.toString()
);
const CheckoutPage = () => {
  const stripeElementsConfig: StripeElementsOptions = {
    fonts: [
      {
        cssSrc:
          "https://fonts.googleapis.com/css2?family=Anonymous+Pro:ital,wght@0,400;0,700;1,400;1,700&family=Comfortaa:wght@300;400;500;600;700&display=swap",
      },
    ],
    locale: "en",
  };

  return (
    <Elements stripe={stripePromise} options={stripeElementsConfig}>
      <CheckoutForm />
    </Elements>
  );
};

export default CheckoutPage;
