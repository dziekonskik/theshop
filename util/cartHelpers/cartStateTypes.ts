interface InitialState {
  type: "InitialState";
}

interface CartItemsLoading {
  type: "CartItemsLoading";
}

interface CartLoadingError {
  type: "CartLoadingError";
  message: string;
}

interface CartItemsOk {
  type: "CartItemsOk";
}
export type TransitionState =
  | InitialState
  | CartItemsLoading
  | CartLoadingError
  | CartItemsOk;