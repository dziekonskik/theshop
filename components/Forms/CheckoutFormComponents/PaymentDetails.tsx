import { useEffect, useState } from "react";
import Image from "next/image";
import { CreditCardComponent, P24Component } from "../StripeElements";
import { PayButton } from "./PayButton";
import { PaymentMethods } from "../../../util/types";
import type { PaymentState } from "../../../util/stripeHelpers";

interface PaymentDetailsProps {
  selectedPaymentMethod: PaymentMethods;
  setSelectedPaymentMethod: React.Dispatch<
    React.SetStateAction<PaymentMethods>
  >;
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  paymentState: PaymentState;
  setPaymentState: React.Dispatch<React.SetStateAction<PaymentState>>;
}

interface PaymentMethod<T extends PaymentMethods> {
  name: T;
  asset: string;
}

const paymentMethodObjects: PaymentMethod<PaymentMethods>[] = [
  { name: PaymentMethods.creditCard, asset: "visa_darkblue.svg" },
  { name: PaymentMethods.p24, asset: "przelewy24-logo.svg" },
];

export const PaymentDetails = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  handleSubmit,
  paymentState,
  setPaymentState,
}: PaymentDetailsProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;

  return (
    <div
      className="flex flex-col items-center justify-between px-6 h-full"
      style={{
        backgroundImage: `linear-gradient(
    135deg,
    transparent 0%,
    transparent 39.99%,
    #6C63FF 40%,
    #6C63FF 59.99%,
    transparent 60%
  )`,
      }}
    >
      <h2 className="inline-block absolute overflow-hidden h-px w-px -m-px p-0 opacity-0">
        Payment Details
      </h2>
      <div className="h-32 w-4/5 flex justify-around items-center">
        {paymentMethodObjects.map(({ name, asset }) => (
          <div
            key={name}
            onClick={() => {
              setPaymentState({ type: "InitialState" });
              setSelectedPaymentMethod(name);
            }}
            className="grayscale transition-transform hover:drop-shadow-lg hover:grayscale-0 hover:scale-125 grid place-content-center border-metal border-2 border-dotted p-2 hover:border-0"
          >
            <Image
              src={`/assets/payment/${asset}`}
              alt={`${name} logo`}
              width={90}
              height={60}
              className="fill-silver"
            />
          </div>
        ))}
      </div>
      <section className="flex-1 w-full flex flex-col items-center justify-around">
        {selectedPaymentMethod === PaymentMethods.creditCard && (
          <CreditCardComponent
            setPaymentState={setPaymentState}
            paymentState={paymentState}
          />
        )}

        {selectedPaymentMethod === PaymentMethods.p24 && (
          <P24Component setPaymentState={setPaymentState} />
        )}

        <PayButton handleSubmit={handleSubmit} paymentState={paymentState} />
      </section>
    </div>
  );
};
