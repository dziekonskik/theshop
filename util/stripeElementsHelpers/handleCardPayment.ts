import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import type { Stripe, StripeElements } from "@stripe/stripe-js";
import type { FormData } from "../../components/Forms/CheckoutForm";
import type { PaymentState } from "./paymentStateTypes";

export async function handleCardPayment(
  clientSecret: string,
  data: FormData,
  stripe: Stripe,
  elements: StripeElements,
  setPaymentState: React.Dispatch<React.SetStateAction<PaymentState>>
) {
  const cardNumberElement = elements.getElement(CardNumberElement);
  if (!cardNumberElement) return;

  const result = await stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: cardNumberElement,
      billing_details: {
        address: {
          line1: data.addressLineOne,
          line2: data.addressLineTwo,
          city: data.city,
          postal_code: data.postalCode,
        },
        email: data.email,
        name: data.name,
        phone: data.phone,
      },
    },
    receipt_email: data.email,
    shipping: {
      name: data.name,
      phone: data.phone,
      address: {
        line1: data.addressLineOne,
        line2: data.addressLineTwo,
        city: data.city,
        postal_code: data.postalCode,
      },
    },
  });

  if (result?.error) {
    setPaymentState({
      type: "PaymentError",
      message: result.error.message || "",
    });
  } else {
    setPaymentState({ type: "PaymentSuccessful" });
    clearCardFIelds(elements);
  }
}

function clearCardFIelds(elements: StripeElements) {
  elements.getElement(CardNumberElement)?.clear();
  elements.getElement(CardCvcElement)?.clear();
  elements.getElement(CardExpiryElement)?.clear();
}
