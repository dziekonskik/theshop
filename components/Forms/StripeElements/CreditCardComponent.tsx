import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
  CardElementProps,
} from "@stripe/react-stripe-js";
import { RssIcon, ChipIcon, EuroIcon } from "../../Svg";

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

export const CreditCardComponent = () => {
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
          className="border border-white text-white p-2"
          options={commonInputStyles}
        />
        <div className="flex justify-between items-end mt-2">
          <div>
            <span className="uppercase font-anonymous text-midnight text-xs">
              cvc
            </span>
            <CardCvcElement
              className="border border-white text-white p-2 w-12"
              options={{ ...commonInputStyles, placeholder: "CVC" }}
            />
          </div>
          <div>
            <span className="capitalize font-anonymous text-midnight text-xs">
              valid thru
            </span>
            <CardExpiryElement
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
