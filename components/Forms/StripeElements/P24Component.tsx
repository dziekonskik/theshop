import { P24BankElement } from "@stripe/react-stripe-js";
import type { PaymentState } from "../../../util/stripeHelpers";

interface P24ComponentProps {
  setPaymentState: React.Dispatch<React.SetStateAction<PaymentState>>;
}

export const P24Component = ({ setPaymentState }: P24ComponentProps) => {
  return (
    <section className="w-full">
      <P24BankElement
        onChange={({ complete }) => {
          complete && setPaymentState({ type: "ReadyToSubmit" });
        }}
        className="w-full p-3 shadow-sm bg-transparent border border-b-purple border-l-purple relative z-10"
        options={{
          classes: { focus: "bg-purple" },
          style: {
            base: {
              padding: "12px",
              fontFamily: "Anonymous Pro, sans-serif",
              fontSize: "16px",
              fontSmoothing: "antialiased",
              backgroundColor: "#E1EDED",
            },
          },
        }}
      />
    </section>
  );
};
