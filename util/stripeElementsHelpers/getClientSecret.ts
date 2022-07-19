import { getCartIdFromStorage } from "../../util/cartHelpers";

export async function getClientSecret() {
  const cartIdFromStrage = getCartIdFromStorage();
  const { clientSecret } = await fetch("api/create-payment-intent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cartIdFromStrage }),
  }).then((response) => response.json());

  return clientSecret;
}
