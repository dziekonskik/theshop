import { useEffect, useState } from "react";
import { PaymentElement } from "@stripe/react-stripe-js";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormInput } from "../FormAtoms/FormInput";
import type { FormData } from "../CheckoutForm";

interface PaymentDetailsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

export const PaymentDetails = ({ errors, register }: PaymentDetailsProps) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <div className="flex flex-col items-center md:items-stretch">
      <h2 className="inline-block absolute overflow-hidden h-px w-px -m-px p-0">
        Payment Details
      </h2>

      <PaymentElement />

      <div className="bg-indigo-300 p-7 rounded-2xl">
        <FormInput
          label="cardnumber"
          type="number"
          placeholder="5105105105105100"
          register={register}
          errors={errors}
        />
        <FormInput
          label="cardholder"
          type="text"
          placeholder="John Smith"
          register={register}
          errors={errors}
        />
        <div className="flex">
          <div className="">
            <FormInput
              label="expiration"
              type="text"
              placeholder="MM/YY"
              register={register}
              errors={errors}
            />
          </div>
          <div className="ml-4">
            <FormInput
              label="cvc"
              type="text"
              placeholder="123"
              register={register}
              errors={errors}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
