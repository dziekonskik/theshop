import type { Stripe } from "@stripe/stripe-js";
import type { FormData } from "../../components/Forms/CheckoutForm";

export async function handleP24Payment(
  clientSecret: string,
  data: FormData,
  stripe: Stripe
) {
  await stripe.confirmP24Payment(clientSecret, {
    payment_method: {
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
    return_url: "http://localhost:3000/checkout",
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
}
