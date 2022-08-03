import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "yup-phone";
import { checkoutFormSchema } from "../../util/yupSchema/checkoutFormSchema";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { ShippingDetails, PaymentDetails } from "./CheckoutFormComponents";
import { ButtonWithIcon } from "../ButtonsAndLinks/ButtonWithIcon";
import { ArrowLeftIcon, ArrowRightIcon } from "../Svg";
import useMediaQuery from "../../util/useMediaquery";
import {
  getClientSecret,
  handleCardPayment,
  handleP24Payment,
  PaymentState,
} from "../../util/stripeElementsHelpers";
import { PaymentMethods } from "../../util/types";
import {
  removeCartFromStorage,
  getCartIdFromStorage,
} from "../../util/cartHelpers/cartUtilFunctions";
import { useCartState } from "../Cart/CartContext";

export type FormData = yup.InferType<typeof checkoutFormSchema>;

export const CheckoutForm = () => {
  const matches = useMediaQuery("(max-width: 768px)");
  const [currentStep, setCurrentStep] = useState<"ship" | "pay" | "ship&pay">();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethods>(PaymentMethods.creditCard);
  const [paymentState, setPaymentState] = useState<PaymentState>({
    type: "InitialState",
  });
  const { resetCartState } = useCartState();
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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(checkoutFormSchema),
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
                <ShippingDetails register={register} errors={errors} />
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
