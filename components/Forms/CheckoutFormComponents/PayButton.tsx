import type { PaymentState } from "../../../util/stripeHelpers";
import {
  ExclamationIcon,
  GiftIcon,
  CheckShieldIcon,
  CubeTransparentIcon,
} from "../../Svg";

interface PayButtonProps {
  handleSubmit: (
    e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  paymentState: PaymentState;
}

export const PayButton = ({ handleSubmit, paymentState }: PayButtonProps) => {
  const paymentInProgress =
    paymentState.type === "InitialState" ||
    paymentState.type === "LeadingState" ||
    paymentState.type === "ReadyToSubmit";
  return (
    <div data-testid="pay-button-wrapper">
      {paymentInProgress && (
        <DefaultStateButton
          handleSubmit={handleSubmit}
          paymentState={paymentState}
        />
      )}
      {paymentState.type === "PaymentSuccessful" && (
        <SuccessStateButton
          handleSubmit={handleSubmit}
          paymentState={paymentState}
        />
      )}
      {paymentState.type === "PaymentError" && (
        <ErrorStateButton
          handleSubmit={handleSubmit}
          paymentState={paymentState}
        />
      )}
    </div>
  );
};

const DefaultStateButton = ({ paymentState, handleSubmit }: PayButtonProps) => {
  return (
    <div className="my-10 w-80 h-24 flex items-center justify-center">
      <button
        className="w-full h-full font-comfortaa flex items-center justify-center relative uppercase text-xl shadow-xl hover:shadow-lg hover:brightness-110 disabled:brightness-90 bg-silver transition-all duration-300"
        type="submit"
        onClick={handleSubmit}
        disabled={paymentState.type !== "ReadyToSubmit"}
      >
        {paymentState.type === "LeadingState" && (
          <CubeTransparentIcon className="absolute left-6 h-9 w-9 animate-spin" />
        )}
        <GiftIcon className="mr-6 h-9 w-9" />
        Purchase
      </button>
    </div>
  );
};

const SuccessStateButton = ({ paymentState, handleSubmit }: PayButtonProps) => {
  return (
    <div className="my-10 w-80 h-24">
      <button
        className="w-full h-full font-comfortaa uppercase shadow-xl flex items-center justify-center text-xl hover:shadow-lg hover:brightness-110 bg-bermuda-intense transition-all duration-300"
        type="submit"
        onClick={handleSubmit}
        disabled={paymentState.type !== "ReadyToSubmit"}
      >
        <CheckShieldIcon className="mr-6 animate-pulseOnce h-9 w-9" />
        Thank you!
      </button>
    </div>
  );
};

const ErrorStateButton = ({ paymentState, handleSubmit }: PayButtonProps) => {
  return (
    <div className="my-10 w-80 h-24 relative">
      <span className="font-anonymous text-xs h-4 text-error absolute -top-7 w-full text-center block">
        {paymentState.type === "PaymentError" && paymentState.message}
      </span>
      <button
        className="w-full h-full font-comfortaa flex items-center text-xl justify-center uppercase shadow-xl hover:shadow-lg hover:brightness-110 bg-bubble-gum transition-all duration-300"
        type="submit"
        onClick={handleSubmit}
        disabled={paymentState.type !== "ReadyToSubmit"}
      >
        <ExclamationIcon
          className="mr-6 animate-pulseOnce h-9 w-9"
          strokeWidth={2}
        />
        Failure
      </button>
    </div>
  );
};
