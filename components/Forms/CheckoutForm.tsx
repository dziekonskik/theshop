import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";
import { addressSchema, emptySchema } from "../../util/yupSchema/addressSchema";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import {
  ShippingAddressManager,
  PaymentDetails,
} from "./CheckoutFormComponents";
import { ButtonWithIcon } from "../ButtonsAndLinks/ButtonWithIcon";
import { ArrowLeftIcon, ArrowRightIcon } from "../Svg";
import useMediaQuery from "../../util/useMediaquery";
import {
  getClientSecret,
  handleCardPayment,
  handleP24Payment,
  PaymentState,
} from "../../util/stripeHelpers";
import { PaymentMethods } from "../../util/types";
import {
  removeCartFromStorage,
  getCartIdFromStorage,
} from "../../util/cartHelpers/cartUtilFunctions";
import { useCartState } from "../Cart/CartContext";
import { usePersonData } from "../../contexts/UserContext";

export type CheckoutFormData = yup.InferType<typeof addressSchema>;

export const CheckoutForm = () => {
  const matches = useMediaQuery("(max-width: 768px)");
  const [currentStep, setCurrentStep] = useState<"ship" | "pay" | "ship&pay">();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethods>(PaymentMethods.creditCard);
  const [paymentState, setPaymentState] = useState<PaymentState>({
    type: "InitialState",
  });
  const [useFetchedAddress, setUseFetchedAddress] = useState(false);
  const { resetCartState } = useCartState();
  const { personDetails } = usePersonData();
  const router = useRouter();
  const elements = useElements();
  const stripe = useStripe();

  useEffect(() => {
    setCurrentStep(matches ? "ship" : "ship&pay");
  }, [matches]);

  useEffect(() => {
    // this is only after redirect from p24
    if (router.query.redirect_status === "succeeded") {
      setPaymentState({ type: "PaymentSuccessful" });
      matches && setCurrentStep("pay");
    }
    if (router.query.redirect_status === "failed") {
      setPaymentState({ type: "PaymentError", message: "" });
      matches && setCurrentStep("pay");
    }
  }, [router.query.redirect_status, matches]);

  const conditionalValidator = useFetchedAddress ? emptySchema : addressSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: yupResolver(conditionalValidator),
    mode: "onBlur",
    defaultValues: {
      addressLineOne: "",
      addressLineTwo: "",
      city: "",
      email: "",
      name: "",
      phone: "",
      postalCode: "",
    },
  });

  const onSubmit = handleSubmit(async (data, event) => {
    if (paymentState.type === "LeadingState") return;
    setPaymentState({ type: "LeadingState" });
    event?.preventDefault();

    const clientSecret = await getClientSecret();

    if (!stripe || !elements || !clientSecret) return;

    if (useFetchedAddress && personDetails.address) {
      data = personDetails.address;
    }

    switch (selectedPaymentMethod) {
      case PaymentMethods.creditCard:
        await handleCardPayment(
          clientSecret,
          data,
          stripe,
          elements,
          setPaymentState,
          resetCartState
        );
        break;
      case PaymentMethods.p24:
        await handleP24Payment(clientSecret, data, stripe);
        break;
    }
  });

  useEffect(() => {
    if (paymentState.type === "PaymentSuccessful" && getCartIdFromStorage()) {
      removeCartFromStorage();
      reset();
    }
  }, [paymentState.type, reset]);

  return (
    <div className="md:max-h-screen w-full">
      <form onSubmit={onSubmit}>
        <div className="md:h-4/5">
          <div className="md:grid md:grid-cols-2">
            <div className="col-start-1">
              {(currentStep === "ship" || currentStep === "ship&pay") && (
                <ShippingAddressManager
                  register={register}
                  errors={errors}
                  useFetchedAddress={useFetchedAddress}
                  setUseFetchedAddress={setUseFetchedAddress}
                />
              )}
              <span className="md:hidden flex justify-end px-6 my-6">
                <ButtonWithIcon
                  bgColor="#6C63FF"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    currentStep === "ship" && isValid
                      ? setCurrentStep("pay")
                      : setCurrentStep("ship");
                  }}
                  side={currentStep === "ship" ? "right" : "left"}
                  fullWidth
                  svgMarkup={
                    currentStep === "ship" ? (
                      <ArrowRightIcon />
                    ) : (
                      <ArrowLeftIcon />
                    )
                  }
                >
                  Next
                </ButtonWithIcon>
              </span>
            </div>
            {(currentStep === "pay" || currentStep === "ship&pay") && (
              <div className="md:col-start-2">
                <PaymentDetails
                  selectedPaymentMethod={selectedPaymentMethod}
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                  handleSubmit={onSubmit}
                  paymentState={paymentState}
                  setPaymentState={setPaymentState}
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
