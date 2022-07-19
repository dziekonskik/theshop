import { useState, useEffect } from "react";
import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
  CardElementProps,
} from "@stripe/react-stripe-js";
import { RssIcon, ChipIcon, EuroIcon } from "../../Svg";
import type { PaymentState } from "../../../util/stripeElementsHelpers";

const commonInputStyles: CardElementProps["options"] = {
  style: {
    empty: {
      "::placeholder": {
        color: "white",
        fontFamily: "Anonymous Pro, sans-serif",
      },
      fontSmoothing: "antialiased",
    },
    base: {
      color: "#3F3D56",
      fontFamily: "Anonymous Pro, sans-serif",
    },
    invalid: {
      color: "#A50203",
      fontFamily: "Anonymous Pro, sans-serif",
    },
  },
};

interface CreditCartComponentProps {
  paymentState: PaymentState;
  setPaymentState: React.Dispatch<React.SetStateAction<PaymentState>>;
}

type IndividualInputState = "complete" | "incomplete";
type IndividualInputName = "cardNumber" | "cvc" | "expiration";

type IndividualInputRecord<
  K extends IndividualInputName,
  V extends IndividualInputState
> = Record<K, V>;

export const CreditCardComponent = ({
  paymentState,
  setPaymentState,
}: CreditCartComponentProps) => {
  const [cardInputsState, setCardInputsState] = useState<
    IndividualInputRecord<IndividualInputName, IndividualInputState>
  >({ cardNumber: "incomplete", cvc: "incomplete", expiration: "incomplete" });

  useEffect(() => {
    const { cardNumber, cvc, expiration } = cardInputsState;
    if (
      cardNumber === "complete" &&
      cvc === "complete" &&
      expiration === "complete"
    ) {
      setPaymentState({ type: "ReadyToSubmit" });
    }
  }, [cardInputsState, setPaymentState]);

  const handleCardInputStateChange = (
    complete: boolean,
    inputName: IndividualInputName
  ) => {
    complete
      ? setCardInputsState({
          ...cardInputsState,
          [inputName]: "complete",
        })
      : setCardInputsState({
          ...cardInputsState,
          [inputName]: "incomplete",
        });
  };

  const mustCorrectError = paymentState.type === "PaymentError";
  return (
    <article className="h-60 w-80 flex flex-col justify-between rounded-2xl shadow-lg py-4 px-7 backdrop-blur-lg border border-l-silver border-b-silver border-t-transparent border-r-transparent">
      <h3 className="font-anonymous capitalize text-center text-midnight">
        enter payment details
      </h3>
      <section className="w-full">
        <span className="relative flex items-center justify-between">
          <ChipIcon className="h-9 w-9 text-midnight" strokeWidth={1} />
          <RssIcon className="rotate-90 text-midnight" />
        </span>
        <span className="capitalize font-anonymous text-midnight text-xs">
          card number
        </span>
        <CardNumberElement
          onChange={({ complete }) => {
            mustCorrectError && setPaymentState({ type: "InitialState" });
            handleCardInputStateChange(complete, "cardNumber");
          }}
          className="border border-white text-white p-2"
          options={commonInputStyles}
        />
        <div className="flex justify-between items-end mt-2">
          <div>
            <span className="uppercase font-anonymous text-midnight text-xs">
              cvc
            </span>
            <CardCvcElement
              onChange={({ complete }) => {
                mustCorrectError && setPaymentState({ type: "InitialState" });
                handleCardInputStateChange(complete, "cvc");
              }}
              className="border border-white text-white p-2 w-12"
              options={{ ...commonInputStyles, placeholder: "CVC" }}
            />
          </div>
          <div>
            <span className="capitalize font-anonymous text-midnight text-xs">
              valid thru
            </span>
            <CardExpiryElement
              onChange={({ complete }) => {
                mustCorrectError && setPaymentState({ type: "InitialState" });
                handleCardInputStateChange(complete, "expiration");
              }}
              className="border border-white text-white p-2 w-20"
              options={{
                ...commonInputStyles,
                placeholder: "MM / YY",
              }}
            />
          </div>
          <EuroIcon className="text-midnight" />
        </div>
      </section>
    </article>
  );
};
