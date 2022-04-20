import { useState } from "react";
import Image from "next/image";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { FormInput } from "../FormAtoms/FormInput";
import type { FormData } from "../CheckoutForm";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

interface PaymentDetailsProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}

interface PaymentMethod {
  name: string;
  asset: string;
}

const paymentMethods: PaymentMethod[] = [
  { name: "credit-card", asset: "credit-card-blank.svg" },
  { name: "przelewy24", asset: "przelewy24-logo.svg" },
];

export const PaymentDetails = ({ errors, register }: PaymentDetailsProps) => {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    paymentMethods[0]
  );
  return (
    <div className="flex flex-col items-center md:items-stretch">
      <h2 className="inline-block absolute overflow-hidden h-px w-px -m-px p-0">
        Payment Details
      </h2>
      <div className="h-24 w-full flex justify-center">
        {paymentMethods.map(({ name, asset }) => (
          <div
            className="h-full w-full grayscale transition-all hover:drop-shadow-lg hover:grayscale-0 hover:scale-125 grid place-content-center"
            key={name}
          >
            <Image
              src={`/assets/${asset}`}
              alt={`${name} logo`}
              width={90}
              height={60}
            />
          </div>
        ))}
      </div>
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
