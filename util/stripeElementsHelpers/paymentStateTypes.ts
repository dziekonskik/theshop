interface InitialState {
  type: "InitialState";
}

interface ReadyToSubmit {
  type: "ReadyToSubmit";
}

interface LoadingState {
  type: "LeadingState";
}

interface PaymentSuccessful {
  type: "PaymentSuccessful";
}

interface PaymentError {
  type: "PaymentError";
  message: string;
}

export type PaymentState =
  | InitialState
  | ReadyToSubmit
  | LoadingState
  | PaymentSuccessful
  | PaymentError;
