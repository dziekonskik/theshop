import { loadStripe } from "@stripe/stripe-js";
import { CartContent } from "../components/Cart/CartContent";
import { CartSummary } from "../components/Cart/CartSummary";
import { useCartState } from "../components/Cart/CartContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CartPage = () => {
  const { items } = useCartState();

  const pay = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      throw new Error("Unable to run stripe");
    }
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application-json",
      },
      body: JSON.stringify(
        items.map((cartItem) => {
          return {
            slug: cartItem.slug,
            count: cartItem.count,
          };
        })
      ),
    });
    //: { session: Stripe.Response<Stripe.Checkout.Session> }
    const { session } = await res.json();

    await stripe.redirectToCheckout({ sessionId: session.id });
  };
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-3 gap-8">
        <CartContent />
        <CartSummary handlePayment={pay} />
      </div>
    </div>
  );
};

export default CartPage;
